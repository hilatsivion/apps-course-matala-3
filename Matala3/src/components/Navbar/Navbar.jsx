import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import ProfileImage from "../../../assets/images/profile-placeholder.png";
import "./style.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>Matala3</h1>
      </div>
      <div className="buttons">
        {!isLoggedIn ? (
          <>
            <button className="btn create-account">
              <Link to="/register-page">Create Account</Link>
            </button>
            <button className="btn login">
              <Link to="/login-page">Log in</Link>
            </button>
          </>
        ) : (
          <div className="profile">
            <div className="profile">
              <img src={ProfileImage} alt="Profile" className="profile-image" />
              <h4 className="profile-text">
                <Link to="/profile-page">Profile</Link>
              </h4>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
