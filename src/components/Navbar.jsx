// src/components/Navbar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://recipe-sharing-platform-yjed.onrender.com/auth/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent if using sessions
      });

      if (response.ok) {
        localStorage.removeItem("token"); // Adjust based on auth logic
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Recipe Sharing</div>
      <div className="navbar-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/create-recipe"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Publish Recipe
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          History
        </NavLink>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
