import "./Navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../utils/UserState";
import { useSocketContext } from "../../utils/SocketState";

const Navbar = () => {
  const [show, setShow] = useState("");
  const [userState, userDispatch] = useUserContext();
  const socket = useSocketContext();

  const logout = () => {
    socket.disconnect();
    userDispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="navbar navbar-expand-sm">
      <h1>Pet Pandemonium</h1>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => (show === "" ? setShow("show") : setShow(""))}
      >
        <i className="fas fa-angle-down"></i>
      </button>
      <div
        className={`collapse navbar-collapse justify-content-end ${show}`}
        id="navigation"
      >
        <div className="nav navbar-nav ml-auto text-right">
          {/* If user is logged in, show in navbar */}
          {userState._id ? (
            <button id="link-logout" className="nav-link btn" onClick={logout}>
              Logout
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
