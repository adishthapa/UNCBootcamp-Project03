import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Button, withStyles, Typography, Paper } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";
import { Auth0Context } from "../react-auth0-wrapper";
import { AddCircle, VpnKey } from "@material-ui/icons";
import API from "../utils/API";
import Navbar from "../components/navbar";
import Chat from "../components/chat";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#1C2022"
    },
    secondary: amber
  }
});

const styles = {
  landingContainer: {
    height: "70vh"
  },
  background: {
    margin: 0,
    height: "95vh",
    backgroundImage: "url('/assets/img/lobbybg.png')",
    backgroundRepeat: "repeat"
  },
  container: {
    height: "60vh",
    flexGrow: 1,
    padding: 5
  },
  button: {
    height: "15vh",
    width: "30vh",
    borderRadius: "15vh"
  },
  welcome: {
    textShadow: "1px 1px 3px #FFFFFF"
  },
  footer: {
    background: "#1c2022",
    flexGrow: 1,
    height: "10vh"
  },
  paper: {
    flexGrow: 1,
    height: "35vh",
    background: "#1c2022"
  }
};

class LobbyView extends Component {
  static contextType = Auth0Context;

  constructor(props) {
    super(props);
    this.state = {
      currentPos: 999999,
      queueLength: 999999,
      joined: false,
      prime: false,
      initialized: false
    };
    this.socket = this.props.socket;
    this.socket.on("ADDPLAYER", data => {
      if (this.state.joined) {
        this.setState({ queueLength: data.que.length });
      }
    });
    this.socket.on("PRIME", () => {
      if (this.props.position >= 0) {
        this.setState({ prime: true });
      }
    });
    this.socket.on("LEAVEQUE", data => {
      const { user } = this.context;
      if (this.state.joined) {
        var pos = data.que
          .map(player => {
            return player.name;
          })
          .indexOf(user.nickname);
        this.setState({
          currentPos: pos + 1,
          queueLength: data.que.length
        });
      }
    });
  }

  init() {
    //when the lobbyview mounts on the dom, toggle the playerLeaveTable key in state on app.js
    this.props.resetRedirect();
    const { user } = this.context;

    API.getUser(user.email)
      .then(res => {
        this.props.setName(
          res.data.username,
          res.data.email,
          res.data.image,
          res.data.cash
        );
      })
      .catch(err => console.log(err));
  }

  joinGame = event => {
    // console.log("joined game");
    event.preventDefault();
    const { user } = this.context;
    API.getUser(user.email).then(res => {
      const playerEmail = res.data.email;
      const playerCash = res.data.cash;
      API.createPlayer({
        name: res.data.username,
        cash: res.data.cash,
        img: res.data.image,
        socketId: this.props.socketId,
        email: playerEmail,
        id: this.props.socketId
      }).then(res => {
        this.setState({
          currentPos: res.data.quePos + 1,
          queueLength: res.data.que.length,
          joined: true
        });
        API.updateUser(playerEmail, { cash: playerCash - 200 });
        this.props.setUserNameAndCash(this.props.name, playerCash - 200);
      });
    });
  };

  leaveQueue = event => {
    event.preventDefault();
    API.leaveQueue(this.props.name).then(() => {
      this.setState({
        currentPos: 999999,
        queueLength: 999999,
        joined: false
      });
      API.getUser(this.props.email).then(res => {
        API.updateUser(res.data.email, { cash: res.data.cash + 200 });
        this.props.setUserNameAndCash(this.props.name, res.data.cash + 200);
      });
    });
  };

  render() {
    const { isAuthenticated, loginWithPopup, loading, user } = this.context;
    const classes = this.props.classes;
    const { socket, allMessages, addMessage } = this.props;

    if (this.state.prime) {
      return <Redirect to="/table" />;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    if (user && !this.state.initialized) {
      this.init();
      this.setState({ initialized: true });
    }
    return (
      <MuiThemeProvider theme={theme}>
        {!isAuthenticated && (
          <Fragment>
            <Navbar />
            <Grid
              container
              alignItems="flex-end"
              className={classes.background}
            >
              <Grid
                className={classes.landingContainer}
                container
                alignItems="center"
                justify="center"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => loginWithPopup({})}
                >
                  <Typography variant="h5">
                    <VpnKey />
                    Log In
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.footer} />
              </Grid>
            </Grid>
          </Fragment>
        )}

        {isAuthenticated && (
          <Fragment>
            <Navbar
              profile="true"
              logout="true"
              name={this.props.name}
              cash={this.props.cash}
            />
            <Grid
              className={classes.background}
              container
              alignItems="flex-end"
              justify="center"
            >
              <Grid item xs={12}>
                <Grid
                  container
                  className={classes.container}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography
                      className={classes.welcome}
                      align="center"
                      variant="h4"
                    >
                      <strong>Welcome to the Lobby!</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify="center">
                      {this.state.joined || this.props.cash < 200 ? (
                        <Button
                          disabled
                          onClick={this.joinGame}
                          className={classes.button}
                          color="secondary"
                          variant="contained"
                        >
                          <Typography variant="h5">
                            <AddCircle />
                            Join Table
                          </Typography>
                        </Button>
                      ) : (
                        <Button
                          onClick={this.joinGame}
                          className={classes.button}
                          color="secondary"
                          variant="contained"
                        >
                          <Typography variant="h5">
                            <AddCircle />
                            Join Table
                          </Typography>
                        </Button>
                      )}

                      {this.state.joined && (
                        <Fragment>
                          <Grid item xs={12}>
                            <Typography align="center" variant="h6">
                              <strong>
                                Current Queue Position: {this.state.currentPos}{" "}
                                out of {this.state.queueLength}
                              </strong>
                            </Typography>
                          </Grid>
                          <Button
                            onClick={this.leaveQueue}
                            color="secondary"
                            variant="contained"
                          >
                            Leave Queue
                          </Button>
                        </Fragment>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {/* <Paper className={classes.footer} /> */}
                <Chat
                  socket={socket}
                  username={user.nickname}
                  allMessages={allMessages}
                  addMessage={addMessage}
                  position={this.props.position}
                />
              </Grid>
            </Grid>
          </Fragment>
        )}
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(LobbyView);
