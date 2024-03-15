import React from "react";
import { setCookie } from "../cookieManager";

// https://getbootstrap.com/docs/5.3/components/navbar/
const Navbar = () => {
  const logout = () => {
    setCookie("email", "");
    window.location = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">TMU Classifieds</a>
        {/* Button for toggling navbar in mobile mode */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarContent" aria-controls="navBarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navBarContent">
          <div className="navbar-nav me-auto">
            <a className="nav-link" href="/items-wanted">Items Wanted</a>
            <a className="nav-link" href="/items-for-sale">Items for Sale</a>
            <a className="nav-link" href="/academic-services">Academic Services</a>
          </div>
          <a className="nav-link" href="/profile" role="button">Profile</a>
          <button type="button" className="btn btn-secondary" onClick={logout} style={{marginLeft: "10px"}}>Logout</button>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;