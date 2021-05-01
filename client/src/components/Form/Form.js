import React from "react";
import FormStyle from "./Form.css"

function Form() {
  return (
    <form style={FormStyle}>
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" id="email-input" className="form-control" placeholder="Email Address"></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" rows="3" id="password-input"className="form-control" placeholder="Password"></input>
      </div>
      <button type="submit" className="btn btn-light" id="signup-button">Sign Up</button>
      <button type="submit" className="btn btn-light" id="login-button">Login</button>
    </form>
  )
}

export default Form;



///// Should I create separate login/signup form - how do I reconcile with login and signup js in public/js
