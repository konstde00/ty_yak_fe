import React from "react";
import './NavBar.css'
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "antd";

const NavBar = () => {

  var navigate = useNavigate();

  const handleLogout = async e => {

    e.preventDefault();

    localStorage.removeItem('token');

    navigate("/login");
  }

  return (
    <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/charts">Charts</NavLink>
            </li>
            <li>
              <NavLink to="/files">Files</NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogout} to="/login">Logout</NavLink>
            </li>
          </ul>
        </nav>
    </header>
  );
};

export default NavBar;