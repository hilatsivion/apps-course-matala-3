import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import "./nav.css";
import { getProfilePictureFromIndexedDB } from "../../indexDB.jsx";
import ProfileImagePlaceholder from "../../../assets/images/profile-placeholder.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for the profile image
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // changes the navbar according to login state
  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      if (user.username === "admin") {
        setIsAdmin(true);
      }
      if (!isAdmin && user.email) {
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
  }, [isAdmin]);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setIsAdmin(false); // Reset admin state
    setProfileImage(null); // Clear the profile image on logout
    navigate("/");
  };

  const handleAdminPageNavigation = () => {
    navigate("/admin-page");
  };

  // handle admin navbar
  if (isAdmin) {
    return (
      <header className="navbar">
        <div className="logo">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" />
            <h1>Matala3</h1>
          </div>
        </div>
        <div className="buttons">
          <h4 className="profile-text" onClick={handleAdminPageNavigation}>
            Admin Page
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
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
          <h1>Matala3</h1>
        </div>
      </div>
      <div className="buttons">
        {!isLoggedIn ? (
          <>
            <button
              className="btn create-account"
              onClick={() => navigate("/register-page")}
            >
              Create Account
            </button>
            <button
              className="btn login"
              onClick={() => navigate("/login-page")}
            >
              Log in
            </button>
          </>
        ) : (
          <div className="profile">
            <img
              src={profileImage || ProfileImagePlaceholder}
              alt="Profile"
              className="profile-image"
            />
            <h4
              className="profile-text"
              onClick={() => navigate("/profile-page")}
            >
              Profile
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
