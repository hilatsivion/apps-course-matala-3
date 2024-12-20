import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "./nav.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for the profile image
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      setProfileImage(user.profilePicture); // Set the profile image from session storage
    } else {
      setIsLoggedIn(false);
      setProfileImage(null); // Clear the profile image
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setProfileImage(null); // Clear the profile image on logout
    navigate("/");
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
              <img
                src={profileImage || "profile-placeholder.png"} // Use a default image if none exists
                alt="Profile"
                className="profile-image"
              />
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
