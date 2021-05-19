import React, { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import "./Form.css";
import { useUserContext } from "../../utils/UserState";

import axios from "axios";

function Form() {
  const [isLogin, setIsLogin] = useState(true);
  const [state, dispatch] = useUserContext();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const logIn = event => {
    event.preventDefault();
    axios
      .post("/api/auth/register_login", {
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      .then(data => {
        dispatch({ type: "LOAD_USER", data: data.data.user });
      })
      .catch(error => {
        alert(error);
      });
  };

  const signUp = event => {
    event.preventDefault();
    axios
      .post("/api/auth/register_login", {
        userName: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      .then(data => {
        axios
          .post("/api/user/set_name", {
            ...data.data.user,
            userName: nameRef.current.value
          })
          .then(data => {
            console.log(data);
            dispatch({ type: "CREATE_USER", data: data });
            setIsLogin(true);
          });
      })
      .catch(error => {
        alert(error);
      });
  };

  if (state._id) {
    return <Redirect to="/lobby" />;
  } else {
    return (
      <form id="login-form">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            id="email-input"
            className="form-control"
            placeholder="Email Address"
            ref={emailRef}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="password-input"
            className="form-control"
            placeholder="Password"
            ref={passwordRef}
          ></input>
        </div>
        {isLogin ? (
          <div>
            <button
              type="submit"
              className="btn"
              id="login-button"
              onClick={logIn}
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="username"
                id="userName-input"
                className="form-control"
                placeholder="Enter User Name (optional)"
                ref={nameRef}
              ></input>
            </div>
            <button
              type="submit"
              className="btn"
              id="signup-button"
              onClick={signUp}
            >
              Sign Up
            </button>
          </div>
        )}
        <button
          className="btn"
          id="change-login"
          onClick={event => {
            event.preventDefault();
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? "sign up instead" : "go to login"}
        </button>
      </form>
    );
  }
}

export default Form;
