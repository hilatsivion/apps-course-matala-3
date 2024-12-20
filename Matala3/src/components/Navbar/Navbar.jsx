import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import ProfileImage from "../../../assets/images/profile-placeholder.png";
import "./nav.css";

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
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
          <h1>Matala3</h1>
        </Link>
      </div>
      <div className="buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/register-page">
              <button className="btn create-account">Create Account</button>
            </Link>

            <Link to="/login-page">
              <button className="btn login">Log in</button>
            </Link>
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
