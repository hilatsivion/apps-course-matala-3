import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import ProfileImage from "../../../assets/images/profile-placeholder.png";
import "./style.css";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Your First Name",
    lastName: "Your Last Name",
    userName: "Your User Name",
    dateOfBirth: "dd.mm.yyyy",
    password: "********",
    city: "Your City",
    street: "Your Street",
    houseNumber: "",
    favoriteGame: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Saved data:", formData); // Change this to save to your database or API
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="flex">
            <img src={ProfileImage} alt="Profile" className="profile-image" />
            <div>
              <h2>First and Last Name</h2>
              <p>email@gmail.com</p>
            </div>
          </div>
          {!isEditing && (
            <button className="btn edit-button" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
        <form className="profile-form">
          <div className="flex">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex">
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>House Number</label>
              <input
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Favorite Website Game</label>
            <input
              type="url"
              name="favoriteGame"
              value={formData.favoriteGame}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <div className="form-actions">
              <button
                type="button"
                className="btn save-button"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                type="button"
                className="btn cancel-button"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
