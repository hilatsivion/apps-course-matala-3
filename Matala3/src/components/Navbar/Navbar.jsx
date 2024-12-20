import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import ProfileImage from "../../../assets/images/profile-placeholder.png";
import "./style.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if currentUser exists in sessionStorage
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear the sessionStorage and log out
    sessionStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login-page");
  };

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
            <button className="btn log-out" onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
