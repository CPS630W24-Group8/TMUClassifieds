import React from "react";

// https://getbootstrap.com/docs/5.3/components/navbar/
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">TMU Classifieds</a>
        {/* Button for toggling navbar in mobile mode */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarContent" aria-controls="navBarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navBarContent">
          <div className="navbar-nav">
            <a className="nav-link" href="/itemsWanted">Items Wanted</a>
            <a className="nav-link" href="/itemsForSale">Items for Sale</a>
            <a className="nav-link" href="/AcademicServices">Academic Services</a>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;