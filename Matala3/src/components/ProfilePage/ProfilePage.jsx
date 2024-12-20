import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
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
    console.log("Saved data:", formData); // You can replace this with API calls
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <img
            src="/path-to-profile-image.jpg" // Replace with your image path
            alt="Profile"
            className="profile-image"
          />
          <div>
            <h2>Alexa Rawles</h2>
            <p>alexarawles@gmail.com</p>
          </div>
          {!isEditing && (
            <button className="btn edit-button" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
        <form className="profile-form">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Last Name"
            />
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="User Name"
            />
            <input
              type="text"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Date of Birth"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="City"
            />
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Street"
            />
            <input
              type="text"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="House Number"
            />
          </div>
          <div className="form-group">
            <input
              type="url"
              name="favoriteGame"
              value={formData.favoriteGame}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Link to a favorite website game"
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
