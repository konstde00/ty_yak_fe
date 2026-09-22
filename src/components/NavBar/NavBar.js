import React from "react";
import './NavBar.css'
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {

  const navigate = useNavigate();

  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <header className="ty-header">
      <div className="ty-header-inner">
        <NavLink className="ty-brand" to="/">Ty <span>yak?</span></NavLink>
        <nav className="ty-nav">
          <NavLink to="/check-in">Check in</NavLink>
          <NavLink to="/circle">Circle</NavLink>
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/charts">Activity</NavLink>
          <NavLink to="/files">Reports and roster</NavLink>
          <a href="/login" className="ty-logout" onClick={handleLogout}>Log out</a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
