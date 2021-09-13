import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import "../Register/register.css";
const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [returnError, setReturnError] = useState("");
  const history = useHistory();
  const register = () => {
    Axios.post("api/user/register", {
      name: userName,
      email: userEmail,
      password: userPassword,
    })
      .then((response) => {
        history.replace("/login");
      })
      .catch((error) => {
        setReturnError(error.response.data);
      });
  };
  return (
    <div className="register-container">
      <div className="register-inner-container">
        <div className="register">
          <label className="label-name">
            <span className="content-name">Name</span>
          </label>
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className="register">
          <label>
            <span className="content-name">Email</span>
          </label>
          <input
            type="text"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="register">
          <label>
            <span className="content-name">Password</span>
          </label>
          <input
            type="password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="register">
          <Link to="/login">Have an account</Link>
          <button onClick={register} className="button">
            Register
          </button>
        </div>
        {returnError}
      </div>
    </div>
  );
};

export default Register;
