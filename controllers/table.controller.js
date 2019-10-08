const db = require("../models");
import Table from "../classes/table";
import Player from "../classes/player";
import Deck from "../classes/Deck";
import io from "../server";
import { cloneDeep } from "lodash";

var serverTable;
var que = [];
var deque = [];

module.exports = {
  // These routes will operate on a virtual table that lives on the server.

  //flash is a route that returns the entire table object, or null if init has not been performed
  flash: (req, res) => {
    if (!serverTable) {
      serverTable = new Table();
    }
    io.emit("FLASH", serverTable);
    res.send();
  },

  // init is a route that will initiate or reset the virtual table. This route is accessed via get or post
  // get will init with defualt values. post will allow for custom values.
  prime: async (req, res) => {
    await prime(req.body);
    res.send();
  },

  //addPlayer is a route that will create a new player and add them to the virtual table. This route is
  //accessed via post with req.body containing name and cash keys.
  addPlayer: async (req, res) => {
    await addPlayer(req.body);
    res.send();
  },

  //leaveTable will automatically cause a player to fold their current hand and flag the player for removal at the end of the hand
  leaveTable: (req, res) => {
    deque.push(req.params.name);
    var pos = -1;
    serverTable.players.forEach((player, index) => {
      if (player.name === req.params.name) {
        pos = index;
        player.didFold = true;
      }
    });
    const { currentBet, position: tablePos, players, pot, round } = serverTable;
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      minBet: currentBet - players[tablePos].bets[round],
      currentBet,
      position: tablePos,
      pot: pot[0]
    });
    res.send();
  },

  leaveQue: (req, res) => {
    que = que.filter(player => player.name !== req.params.name);
    io.emit("LEAVEQUE", { name: req.params.name });
    res.send();
  },
  //dealCards will update the player object for each player stored in the players array. Because player cards are private,
  //this route will not return any data.
  dealCards: async (req, res) => {
    await dealCards();
    res.send();
  },

  //To get a players card, do a get request to "/player/:position/cards". This route expects the player position on req.params.position
  getPlayerCards: (req, res) => {
    var playerCards = serverTable.players[parseInt(req.params.position)].cards;
    res.json({ playerCards });
  },

  //doFlop will burn a card from the deck and then return the next three cards. These cards are store in the flop key of the table object
  doFlop: async (req, res) => {
    await doFlop();
    res.send();
  },

  //doTurn will burn a card from the deck and return a single card. This card is stored in the turn key of the table object.
  doTurn: async (req, res) => {
    await doTurn();
    res.send();
  },

  //doRiver will burn a card from the deck and return a single card. This card is stored in the river key of the table object.
  doRiver: async (req, res) => {
    await doRiver();
    res.send();
  },

  //getTableCards will return all cards from the flop, turn, and river keys of the table object
  getTableCards: (req, res) => {
    var tableCards = [];
    serverTable.flop.forEach(card => {
      tableCards.push(card);
    });
    if (serverTable.turn) {
      tableCards.push(serverTable.turn);
    }
    if (serverTable.river) {
      tableCards.push(serverTable.river);
    }
    io.emit("TABLECARDS", { tableCards });
    res.send();
  },

  //calculateHands uses the findBestHands method on the table object to determine the hand rankings. The entire hands array is returned.
  calculateHands: (req, res) => {
    var hands = serverTable.findBestHand();
    io.emit("CALCULATEHANDS", { hands });
    res.send();
  },
  //payout is a method that pays out a player based on the hand ranking
  payout: async (req, res) => {
    await payout();
    res.send();
  },
  //placeBet adds player money to the pool and updates the player object stored in the players array.
  //this route expects the player.position value on req.params.position and the player bet amount on req.params.amount
  // amounts can be -1 (or any value less than 0 -> this is a fold), 0 (this is a check), amount (any number greater than 0 -> this is a bet or raise)
  placeBet: (req, res) => {
    const { position: pos, amount: amt } = req.params;
    const { position: tablePos, round, currentBet, players, betsIn, pot } = serverTable;
    let position = parseInt(pos);
    let amount = parseInt(amt);
    if (position < 0) {
      io.emit("PLACEBET", {
        players: fetchPlayers(),
        minBet: currentBet - players[tablePos].bets[round],
        currentBet,
        position: tablePos,
        pot: pot[0]
      });
      return res.send();
    }
    if (betsIn) {
      io.emit("ERROR", {
        err: "All bets are in for the current round."
      });
      return res.send();
    }
    if (position !== tablePos) {
      io.emit("ERROR", {
        err: `It's not your turn to bet. Betting is on the player at position ${tablePos} and the currentBet is ${currentBet}`
      });
      return res.send();
    }
    //check the bet amount against the current bet.
    //the table expects a bet that will, at minimum, bring the player to par with the current total bet.
    var parAmount = currentBet - players[position].bets[round];
    if (amount === players[pos].chips) {
      allIn(pos);
    } else if (amount < 0) {
      fold(position);
    } else if (amount === 0 && parAmount === 0) {
      check(position);
    } else if (parAmount > amount) {
      //the player bet is too small. throw err
      io.emit("ERROR", {
        err: `Your bet of ${amount} is too low. The action (the minimum to bet) is ${parAmount}`
      });
      return res.send();
    } else if (amount === parAmount) {
      //the player calls
      call(amount, position);
    } else if (amount > parAmount && parAmount === 0) {
      //this is a bet (because parAmount is 0)
      bet(amount, position);
    } else if (amount > parAmount) {
      //or a raise (because parAmount > 0 and amount > parAmount)
      raise(amount, position);
    } else {
      console.log("FALLOUT", amount, position);
    }
    res.send();
  }
};

//private method for handling bets
let fold = pos => {
  console.log("FOLD METHOD");
  serverTable.players[parseInt(pos)].didFold = true;
  serverTable.foldedPlayers++;
  serverTable.checkBets();
  if (serverTable.betsIn && serverTable.foldedPlayers === serverTable.players.length - 1) {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      pot: serverTable.pot[0]
    });
    next(4);
  }
  const { position, players, currentBet, round, betsIn } = serverTable;
  if (betsIn) {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      pot: serverTable.pot[0]
    });

    next(serverTable.round + 1);
  } else {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      minBet: currentBet - players[position].bets[round],
      currentBet,
      position,
      pot: serverTable.pot[0]
    });
  }
};

let call = (amount, pos) => {
  console.log("CALL METHOD");
  serverTable.players[pos].bet(amount, serverTable.round);
  serverTable.collect(amount);
  serverTable.checkBets();
  const { position, players, currentBet, round } = serverTable;
  if (serverTable.betsIn) {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      pot: serverTable.pot[0]
    });
    next(serverTable.round + 1);
  } else {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      minBet: currentBet - players[position].bets[round],
      currentBet,
      position,
      pot: serverTable.pot[0]
    });
  }
};

let bet = (amount, pos) => {
  serverTable.players[pos].bet(amount, serverTable.round);
  var remainingChips = serverTable.players[pos].chips;
  serverTable.collect(amount);
  serverTable.currentBet = amount;
  serverTable.checkBets();
  const { position, players, currentBet, round, betsIn } = serverTable;
  if (betsIn) {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      pot: serverTable.pot[0]
    });
    next(serverTable.round + 1);
  } else {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      minBet: currentBet - players[position].bets[round],
      currentBet,
      position,
      pot: serverTable.pot[0]
    });
  }
};

let raise = (amount, pos) => {
  serverTable.players[pos].bet(amount, serverTable.round);
  serverTable.collect(amount);
  serverTable.currentBet = amount;
  serverTable.checkBets();
  const { position, players, currentBet, round } = serverTable;
  io.emit("PLACEBET", {
    players: fetchPlayers(),
    minBet: currentBet - players[position].bets[round],
    currentBet,
    position,
    pot: serverTable.pot[0]
  });
};

let check = pos => {
  serverTable.players[pos].didBet = true;
  serverTable.checkBets();
  const { position, players, currentBet, round, betsIn } = serverTable;
  if (betsIn) {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      pot: serverTable.pot[0]
    });
    next(serverTable.round + 1);
  } else {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      minBet: currentBet - players[position].bets[round],
      currentBet,
      position,
      pot: serverTable.pot[0]
    });
  }
};

let allIn = pos => {
  var amount = serverTable.players[pos].bet(serverTable.players[pos].chips);

  serverTable.collect(amount);
  //check the amount against the current bet
  if (amount > serverTable.currentBet) {
    serverTable.currentBet = amount;
  }
  serverTable.checkBets();
  const { position, players, currentBet, round, betsIn } = serverTable;
  if (betsIn) {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      pot: serverTable.pot[0]
    });
    next(serverTable.round + 1);
  } else {
    io.emit("PLACEBET", {
      players: fetchPlayers(),
      minBet: currentBet - players[position].bets[round],
      currentBet,
      position,
      pot: serverTable.pot[0]
    });
  }
};

let fetchPlayers = () => {
  var playerInfo = cloneDeep(serverTable.players);
  playerInfo.forEach(player => {
    player.cards = undefined;
  });
  return playerInfo;
};

let next = async round => {
  let deckActions = ["deal", "flop", "turn", "river", "payout"];
  switch (deckActions[round]) {
    case "deal":
      await dealCards();
      break;
    case "flop":
      await doFlop();
      break;
    case "turn":
      await doTurn();
      break;
    case "river":
      await doRiver();
      break;
    case "payout":
      await payout();
      break;
    default:
      console.log("NEXT DEFAULT REACHED");
  }
};

let prime = async obj => {
  return new Promise(resolve => {
    if (!serverTable) {
      if (obj) {
        const { buyIn, bigBlind, smallBlind, autoIncrementBlinds, limit } = obj;
        serverTable = new Table(buyIn, bigBlind, smallBlind, autoIncrementBlinds, limit);
      } else {
        serverTable = new Table();
      }
    } else {
      serverTable.round = 0;
      serverTable.currentBet = 0;
      serverTable.deck = new Deck();
      serverTable.flop = [];
      serverTable.turn = undefined;
      serverTable.river = undefined;
      serverTable.pot = [0];
      serverTable.betsIn = false;
      serverTable.dealerIndex++;
      if (serverTable.dealerIndex === serverTable.players.length) {
        serverTable.dealerIndex = 0;
      }
      serverTable.players.forEach((player, index) => {
        player.position = index;
        player.bets = [0];
        player.didFold = false;
        player.isAllIn = false;
        player.cards = [];
        player.didBet = false;
      });
    }
    deque.forEach(name => {
      serverTable.players.forEach((player, index) => {
        if (player.name === name) {
          if (que.length > 0) {
            serverTable.addPlayer(que.shift(), index);
          } else {
            serverTable.players = serverTable.players.filter(value => value.name !== name);
          }
        }
      });
      io.emit("LEAVETABLE", { name });
    });
    // if (deque.length > 0) {
    //   for (var i = 0; i < serverTable.players.length; i++) {
    //     if (deque.includes(serverTable.players[i].name)) {
    //       deque = deque.filter(name => name !== serverTable.players[i].name);
    //       io.emit("LEAVETABLE", serverTable.players[i]);
    //       if(que.length > 0){
    //         var player = que.shift();
    //         serverTable.addPlayer(player, i);
    //       }
    //       else{
    //         serverTable.players = serverTable.players.filter(player => )
    //       }
    //     }
    //   }
    // }
    while (que.length > 0) {
      if (serverTable.players.length === 8) {
        break;
      }
      var player = que.shift();
      if (player.cash < serverTable.buyIn) {
        tooPoor.push(player);
        continue;
      }
      serverTable.addPlayer(player);
    }
    io.emit("PRIME", {
      players: fetchPlayers(),
      dealerIndex: serverTable.dealerIndex,
      pot: serverTable.pot[0],
      bigBlind: bigBlind
    });
    resolve();
  });
};

let addPlayer = async obj => {
  return new Promise(resolve => {
    const { name, cash, img, id } = obj;
    var player = new Player(name, parseInt(cash), img, id);
    //check to see if the player name exists on the table
    var isAtTable = false;
    var tableIndex = -1;
    if (serverTable) {
      serverTable.players.forEach((p, index) => {
        if (player.name === p.name) {
          isAtTable = true;
          tableIndex = index;
        }
      });
    }
    if (isAtTable) {
      serverTable.players[tableIndex].id = player.id;
      io.emit("PRIME", {
        players: fetchPlayers(),
        dealerIndex: serverTable.dealerIndex,
        pot: serverTable.pot[0]
      });
      return resolve();
    }
    var quePos = que.length;
    que.push(player);
    io.emit("ADDPLAYER", {
      quePos,
      player,
      que
    });
    resolve();
  });
};

let dealCards = async () => {
  return new Promise(resolve => {
    if (serverTable.deck.cards.length < 52) {
      io.emit("ERROR", {
        err: "Cards have already been dealt!",
        next: "GET '/api/player/<position>/cards' OR '/api/table/bet/<amount>' OR '/api/table/flop'"
      });
      return resolve();
    }
    //make sure there is at least one player at the table
    if (serverTable.players.length === 0) {
      io.emit("ERROR", {
        err: "You need to add at least one player to the table before you deal!",
        next: "GET '/api/table/join'",
        expecting: { name: "player name", chips: 200 }
      });
      return resolve();
    }
    //collect the blinds from players in the small blind and big blind position.
    var small = serverTable.dealerIndex + 1;
    if (small === serverTable.players.length) {
      small = 0;
    }
    var big = small + 1;
    if (big === serverTable.players.length) {
      big = 0;
    }
    if (serverTable.players.length === 2) {
      //the dealer is also the small blind
      serverTable.players[0].chips -= serverTable.smallBlind;
      serverTable.players[0].bets[0] += serverTable.smallBlind;
      serverTable.players[1].chips -= serverTable.bigBlind;
      serverTable.players[1].bets[0] += serverTable.bigBlind;
      serverTable.collect(serverTable.smallBlind + serverTable.bigBlind);
    } else {
      //there are more than 2 players
      serverTable.players[small].chips -= serverTable.smallBlind;
      serverTable.players[small].bets[0] += serverTable.smallBlind;
      serverTable.players[big].chips -= serverTable.bigBlind;
      serverTable.players[big].bets[0] += serverTable.bigBlind;
      serverTable.collect(serverTable.smallBlind + serverTable.bigBlind);
    }
    serverTable.currentBet = serverTable.bigBlind;
    //rotate past the dealer.
    var amount = serverTable.dealerIndex + 1;
    for (var i = 0; i < amount; i++) {
      serverTable.rotate();
    }
    serverTable.deal();
    serverTable.restoreOrder();
    //set the stage for betting by setting the table.position value to the player after big blind
    var after = big + 1;
    if (after === serverTable.players.length) {
      after = 0;
    }
    serverTable.position = after;
    io.emit("DEALCARDS", {
      players: fetchPlayers()
    });
    resolve();
  });
};

let doFlop = async () => {
  return new Promise(resolve => {
    if (serverTable.flop.length === 3) {
      io.emit("ERROR", {
        err: "The flop has already been dealt",
        next:
          "GET '/api/table/cards' OR '/api/player/<position>/cards' OR '/api/table/bet/<amount>' OR '/api/table/turn'"
      });
      return resolve();
    }
    var flop = serverTable.doFlop();
    //increment the round, toggle betsIn, reset the currentBet value, and reset the didBet value for each player
    serverTable.betsIn = false;
    serverTable.currentBet = 0;
    serverTable.round++;
    serverTable.players.forEach(player => {
      player.didBet = false;
      player.bets.push(0);
    });
    const { position, currentBet, players, round } = serverTable;
    io.emit("DOFLOP", {
      flop
    });
    resolve();
  });
};

let doTurn = async () => {
  return new Promise(resolve => {
    if (serverTable.flop.length < 3) {
      io.emit("ERROR", {
        err: "The flop has not been dealt",
        next: "GET '/api/player/<position>/cards' OR '/api/table/bet/<amount>' OR '/api/table/flop'"
      });
      return resolve();
    }
    if (serverTable.turn) {
      console.log("Error Turn");
      io.emit("ERROR", {
        err: "The turn has already been dealt",
        next:
          "GET '/api/table/cards' OR '/api/player/<position>/cards' OR '/api/table/bet/<amount>' OR '/api/table/river'"
      });
      return resolve();
    }
    var turn = serverTable.doTurn();
    //increment the round, toggle betsIn, reset the currentBet value, and reset the didBet value for each player
    serverTable.betsIn = false;
    serverTable.currentBet = 0;
    serverTable.round++;
    serverTable.players.forEach(player => {
      player.didBet = false;
      player.bets.push(0);
    });
    const { position, currentBet, players, round } = serverTable;
    io.emit("DOTURN", {
      turn
    });
    resolve();
  });
};

let doRiver = async () => {
  return new Promise(resolve => {
    if (!serverTable.turn) {
      io.emit("ERROR", {
        err: "The turn has not been dealt",
        next:
          "GET '/api/table/cards' OR '/api/player/<position>/cards' OR '/api/table/bet/<amount>' OR '/api/table/turn'"
      });
      return resolve();
    }
    if (serverTable.river) {
      io.emit("ERROR", {
        err: "The river has already been dealt",
        next:
          "GET '/api/table/cards' OR '/api/player/<position>/cards' OR '/api/table/bet/<amount>' OR '/api/table/hands'"
      });
      return resolve();
    }
    var river = serverTable.doRiver();
    //increment the round, toggle betsIn, reset the currentBet value, and reset the didBet value for each player
    serverTable.betsIn = false;
    serverTable.currentBet = 0;
    serverTable.round++;
    serverTable.players.forEach(player => {
      player.didBet = false;
      player.bets.push(0);
    });
    const { position, currentBet, players, round } = serverTable;
    io.emit("DORIVER", {
      river
    });
    resolve();
  });
};

let payout = async () => {
  return new Promise(resolve => {
    var hands = serverTable.findBestHand();

    //calculate the max payout for each player
    for (var i = 0; i < serverTable.players.length; i++) {
      var currentPlayer = serverTable.players[i];
      var payout = 0;
      var count = 0;
      currentPlayer.bets.forEach((bet, index) => {
        if (bet === 0) return;
        count = index;
      });
      var lastBet = currentPlayer.bets[count];
      //sum up all but the last bet
      for (var j = 0; j < count; j++) {
        serverTable.players.forEach(player => {
          payout += player.bets[j];
        });
      }
      //a player's last bet could be an allIn bet
      serverTable.players.forEach(player => {
        var plb = player.bets[count];
        if (plb > lastBet) {
          payout += lastBet;
        } else {
          payout += plb;
        }
      });
      currentPlayer.payout = payout;
    }
    var pot = serverTable.pot[0];
    var payouts = [];
    for (var i = 0; i < serverTable.players.length; i++) {
      payouts.push(0);
    }
    //ranks is an array of arrays of similaraly ranked hands
    var ranks = [];
    for (var i = 1; i < hands[hands.length - 1].rank + 1; i++) {
      var clone = cloneDeep(hands);
      ranks.push(clone.filter(hand => hand.rank === i));
    }
    for (var i = 0; i < ranks.length; i++) {
      var currentRank = ranks[i];
      currentRank.sort((a, b) => serverTable.players[a.playerIndex].payout - serverTable.players[b.playerIndex].payout);
      while (currentRank.length > 0) {
        var n = currentRank.length;
        var lowestPayout = currentRank.shift();
        var sidePot = serverTable.players[lowestPayout.playerIndex].payout;
        pot -= sidePot;
        serverTable.players.forEach(player => {
          player.payout -= sidePot;
          if (player.payout < 0) {
            player.payout = 0;
          }
        });
        payouts[lowestPayout.playerIndex] += Math.round(sidePot / n);
        currentRank.forEach(rank => {
          payouts[rank.playerIndex] += Math.round(sidePot / n);
        });
      }
      if (pot <= 0) {
        break;
      }
    }

    payouts.forEach((value, index) => {
      serverTable.players[index].chips += value;
    });
    io.emit("PAYOUT", {
      players: fetchPlayers(),
      payouts,
      hands,
      pot
    });
    resolve();
  });
};
