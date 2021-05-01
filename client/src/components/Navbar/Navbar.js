import NavBarStyle from "./Navbar.css"
import React, { useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState("");

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <h1 className="navbar-brand">PROJECT NAME</h1>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation"
        aria-expanded="false" aria-label="Toggle navigation" onClick={() => (show === "" ? setShow("show") : setShow(""))} >
        <i class="fas fa-angle-down"></i>
      </button>
      <div className={`collapse navbar-collapse justify-content-end ${show}`} id="navigation">
        <div className="nav navbar-nav ml-auto text-right">
          {/* If user is logged in, show in navbar */}
          if (user.isLoggedIn()) {
          <a id="link-logout" class="nav-link" href="/logout">LOGOUT</a>
          }
        </div>
      </div>
    </nav>
  )
};

export default Navbar;