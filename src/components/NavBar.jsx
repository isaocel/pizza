import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="nav-item">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Anasayfa
        </NavLink>
      </div>
      <div className="separator">-</div>
      <div className="nav-item">
        <NavLink
          to="/order"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Sipariş oluştur
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
