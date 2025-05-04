import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Cricket Central</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/matches">Matches</Link>
        <Link to="/series">Series</Link>
        <Link to="/trending-players">Trending Players</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/standings">Standings</Link>
      </div>
    </nav>
  );
};

export default Navbar;
