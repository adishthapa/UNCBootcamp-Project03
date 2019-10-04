# UNCBootcamp-Project03

# Auth0 Configuration

### Setting up the Database

Run the following command in the main directory to setup the Mongo Database:

**npm run seed**

### Setting up Auth0 Configuration

Create a file called **auth_config.json** in the **/client/src** directory with the following content:

{
'domain': '<YOUR_AUTH0_DOMAIN>',
'clientId': '<YOUR_AUTH0_CLIENT_ID>'
}

### Testing Auth0 Configuration

On the main page, click **Log in** to authenticate with Auth0 and type in the following credentials:

username/email: **test@testing.com**
password: **Password!123**

Afterwards, it should log you in and since the User does not exist in your local database, it will create one for you.

### User API Calls

1. GET to '/api/users' returns all of the Users in our local database
2. POST to '/api/users' which requires:
   {
   "username": 'STRING',
   "email:" 'STRING',
   "image:" 'STRING'
   "achievements:" 'STRING',
   "preferences:" 'STRING'
   }
   creates a User in our local database

3. GET to '/api/users/email' returns a unique User with the given email

# API Poker

### The API server is able to play a single hand of poker through api calls. Here's how:

1. GET to '/api/table/init' **OR** POST to '/api/table/init', which requires:
   {
   "buyIn": `NUMBER`,
   "smallBlind": `NUMBER`,
   "bigBlind": `NUMBER`,
   "autoIncrementBlinds": `BOOLEAN`,
   "limit": `BOOLEAN`
   }

2. POST to '/api/table/join' which requires:
   {
   "name": `STRING`,
   "chips": `NUMBER`
   }

3. GET to '/api/table/deal'

4. GET to '/api/player/`<position>`/cards

5. GET to '/api/table/flop'

6. GET to '/api/table/turn'

7. GET to 'api/table/river'

8. GET to 'api/table/hands'
   <hr/>

### A note on betting

You can place bets after step 2. Traditional poker would require bets to be made by the big and small blinds before the deal and then by all players after each dealer (`/api/table`) action, ending with a round of betting after the river. Bets can be placed through the route:

- GET '/api/table/bet/`<position>`/`<amount>`'

where `<position>` is the player position on the table and `<amount>` is the amount to bet. Currently the table defaults to `limit=true`,
which requires that bets be in increments of the big blind, with raises only allowed after an initial bet and only by one increment
of the big blind. You can override limit by using POST in step 1.

### Bet amounts

The betting algorithm is driven by numeric values. There are two _special_ bets, viz `fold` and `check`, which are done by submitting an amount **less than 0** or **0** respectively. Any other amount submitted to the api is simply deducted from the player chips and added to the pot.

<hr/>
