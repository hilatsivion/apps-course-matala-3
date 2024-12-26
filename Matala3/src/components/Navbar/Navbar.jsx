import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "./nav.css";
import { getProfilePictureFromIndexedDB } from "../../indexDB.jsx";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for the profile image
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      if (user.username === "admin") {
        setIsAdmin(true);
      }
      if ((!isAdmin) && (user.email)) {
        const loadProfilePicture = async () => {
          const picture = await getProfilePictureFromIndexedDB(user.email);
          setProfileImage(picture || null);
        };

        loadProfilePicture();
      }
    } else {
      setIsLoggedIn(false);
      setProfileImage(null); // Clear the profile image
      setIsAdmin(false); // Reset admin state
    }
  },[isAdmin]);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setIsAdmin(false); // Reset admin state
    setProfileImage(null); // Clear the profile image on logout
    navigate("/");
  };

  if (isAdmin) {
    return (
      <header className="navbar">
        <div className="logo">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
            <h1>Matala3</h1>
          </Link>
        </div>
        <div className="buttons">
          <h4 className="profile-text">
            <Link to="/admin-page">Admin Page</Link>
          </h4>
          <button className="btn log-out" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>
    );
  }

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
            <img
              src={profileImage || "profile-placeholder.png"} // Use a default image if none exists
              alt="Profile"
              className="profile-image"
            />
            <h4 className="profile-text">
              <Link to="/profile-page">Profile</Link>
            </h4>
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
