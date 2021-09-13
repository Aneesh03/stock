import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import "./login.css";
const Login = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [returnError, setReturnError] = useState("");
  const history = useHistory();
  const login = () => {
    Axios.post("/api/user/login", {
      email: userEmail,
      password: userPassword,
    })
      .then((response) => {
        localStorage.setItem("token", response.data);
        history.replace("/home");
      })
      .catch((error) => {
        setReturnError(error.response.data);
      });
  };
  return (
    <div className="login-container">
      <div className="login-inner-container">
        <div className="login">
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="login">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="login">
          <Link to="/">Create an account</Link>
          <button onClick={login} className="login-button">
            Login
          </button>
        </div>
        {returnError}
      </div>
    </div>
  );
};

export default Login;
