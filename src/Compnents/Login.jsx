import React from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { IconButton } from "@mui/material";
import { useStateValue } from "./StateProvider";
import { auth, provider } from "../firebase";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const handleSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="login-wrapper">
      {/* Login Header */}
      <div className="login-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
          alt="logo"
          height="40px"
          width="40px"
        />
        <h2 className="login-title">WhatsApp Web</h2>
      </div>

      {/* Login Body */}
      <div className="login-body">
        <div className="login-content">
          <h2>Use WhatsApp on your computer</h2>
          <ol>
            <li>Launch the WhatsApp application on your device</li>
            <li>
              On the welcome screen, tap on "Sell my data" to proceed
            </li>
            <li>On the login screen, choose the "Login with Gmail" option</li>
            <li>
              Enter your Gmail email address and password in the provided fields
              and tap on "Next" to proceed
            </li>
          </ol>
          <input type="checkbox" id="login-agree" />
          <label htmlFor="login-agree">Sell my data</label>
        </div>

        <div className="login-button-container">
          <div className="login-image">
            <IconButton onClick={handleSignIn}>
              <AccountBoxIcon
                style={{ fontSize: "300px", color: "#00a884" }}
              />
            </IconButton>
          </div>
          <div className="login-button">
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleSignIn}
            >
              LOGIN WITH GMAIL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
