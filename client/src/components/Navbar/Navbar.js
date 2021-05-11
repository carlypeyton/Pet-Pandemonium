import "./NavBar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState("");

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
          <Link id="link-logout" className="nav-link" to="/">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
