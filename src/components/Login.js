import React, { useState } from "react";
import auth from "./firebase";
import {
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  createMuiTheme,
  Grid,
  Paper,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  // content: {
  //   flex: 1,
  //   height: "100vh" /* Magic here */,
  //   display: "flex",
  //   justify: "center",
  //   alignContent: "center",
  // },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: "100vh",
    justify: "center",
    alignItems: "center",
    justifyItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
});

const Login = ({ setSession }) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
    isClickSignUp: false,
  });

  const handleLogin = async () => {
    try {
      if (values.isClickSignUp) {
        const response = auth.createUserWithEmailAndPassword(
          username,
          password
        );

        const { user } = response;

        setSession({
          isLoggedIn: true,
          currentUser: user,
        });
      } else {
        const response = await auth.signInWithEmailAndPassword(
          username,
          password
        );
        const { user } = response;

        setSession({
          isLoggedIn: true,
          currentUser: user,
        });
      }
    } catch (err) {
      console.log({ err });

      setSession({
        isLoggedIn: false,
        currentUser: null,
        errorMessage: err.message,
      });
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickSign = () => {
    console.log(values.isClickSignUp);
    setValues({ isClickSignUp: !values.isClickSignUp });
  };
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false,
    },
  };

  return (
    // <div>
    //   <input type="email" onChange={handleUsername}></input>
    //   <input type="password" onChange={handlePassword}></input>
    //   <button onClick={handleLogin}>Login</button>
    //   <button onClick={handleRegister}>Register</button>
    // </div>

    // <Container maxWidth="xs">
    //   <Grid container className={classes.content} spacing={2}>

    <div className={classes.root}>
      <Grid container className={classes.content}>
        <Grid item xs={12} className={classes.content}>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: "5vh" }}>
              <Grid item xs={12}>
                <h1>{values.isClickSignUp ? "SIGN UP" : "MEMBER LOGIN"}</h1>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label="Email"
                  fullWidth
                  onChange={handleUsername}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  label="Password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handlePassword}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  item
                  xs={5}
                  style={{ textAlign: "left", fontSize: "15px" }}
                >
                  <a href="#" onClick={handleClickSign}>
                    {values.isClickSignUp
                      ? "I am already member"
                      : "Create an account"}
                  </a>
                </Grid>
                {/* <Grid item xs={5} style={{ textAlign: "right" }}>
                  <a href="#"> Forgot password?</a>
                </Grid> */}
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleLogin}
                  // onClick={{ handleLogin }}
                >
                  {values.isClickSignUp ? "Register" : " Log in"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <p>Or login with</p>
              </Grid>
              <Grid item xs={12}>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
