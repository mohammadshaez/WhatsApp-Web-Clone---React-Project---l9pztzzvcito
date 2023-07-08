import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Compnents/Sidebar";
import ChatBox from "./Compnents/ChatBox";
import { Switch, Route } from "react-router-dom";
import Login from "./Compnents/Login";
import { useStateValue } from "./Compnents/StateProvider";
import { auth } from "./firebase";

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    });
  }, []);

  return (
      <Switch>
        <>
          {user ? (
            <div className="app">
              <div className="app-body">
                <Sidebar/>
                <Route exact path="/" component={ChatBox} />
                <Route path="/rooms/:roomId" component={ChatBox} />
              </div>
            </div>
          ) : (
            <Login />
          )}
        </>
      </Switch>
  );
};

export default App;
