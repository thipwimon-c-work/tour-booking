import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import auth from "./components/firebase";
import { Container, Typography } from "@material-ui/core";

function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null,
  });

  useEffect(() => {
    const handleAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setSession({
          isLoggedIn: true,
          currentUser: user,
          errorMessage: null,
        });
      }
    });

    return () => {
      handleAuth();
    };
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setSession({
        isLoggedIn: false,
        currentUser: null,
        errorMessage: null,
      });
    });
  };

  return (
    <React.Fragment>
      <Container maxWidth="md" style={{backgroundColor:"white"}}>
        <div className="App" >
          {session.isLoggedIn ? (
            <div>
              <p>Hello {session.currentUser && session.currentUser.email} </p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Login setSession={setSession} />
          )}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default App;
