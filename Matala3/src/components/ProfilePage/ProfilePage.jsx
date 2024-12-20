import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import UserAlert from "../UserAlert/UserAlert.jsx";
import ProfileImagePlaceholder from "../../../assets/images/profile-placeholder.png";
import "./style.css";

function ProfilePage() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log(currentUser);

  const [isEditing, setIsEditing] = useState(false);
  const [globalAlert, setGlobalAlert] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    username: currentUser.username,
    email: currentUser.email,
    dateOfBirth: currentUser.dateOfBirth,
    profilePicture: currentUser.profilePicture || ProfileImagePlaceholder,
    password: currentUser.password,
    city: currentUser.city,
    street: currentUser.street,
    houseNumber: currentUser.houseNumber,
    favoriteWebSiteGameLink: currentUser.favoriteWebSiteGameLink,
  });

  const validateField = (name, value) => {
    let alertMessage = "";
    const users = JSON.parse(localStorage.getItem("users")) || [];

    switch (name) {
      case "userName":
        if (!/^[A-Za-z0-9!@#$%^&*()_+=-]{1,60}$/.test(value)) {
          alertMessage =
            "Username must be up to 60 characters and contain only letters, numbers, and special characters.";
        } else if (
          value !== currentUser.username && // Allow the current username
          users.some((user) => user.username === value)
        ) {
          alertMessage = "Username already registered!";
        }
        break;

      case "password":
        if (
          !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,12}$/.test(
            value
          )
        ) {
          alertMessage =
            "Password must be 7-12 characters long, include a number, a special character, and an uppercase letter.";
        }
        break;

      case "firstName":
      case "lastName":
        if (!/^[A-Za-z]+$/.test(value)) {
          alertMessage = "Only letters are allowed.";
        }
        break;

      case "email":
        if (
          !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value) ||
          !value.endsWith(".com")
        ) {
          alertMessage = "Email must be valid and end with .com.";
        } else if (
          value !== currentUser.email && // Allow the current email
          users.some((user) => user.email === value)
        ) {
          alertMessage = "Email already registered!";
        }
        break;

      case "favoriteWebSiteGameLink":
        if (!/^(http|https):\/\/[^ "]+$/.test(value)) {
          alertMessage = "Please enter a valid link.";
        }
        break;

      case "dateOfBirth": {
        const today = new Date();
        const selectedDate = new Date(value);
        if (selectedDate > today || selectedDate.getFullYear() < 1900) {
          alertMessage = "Enter a valid date of birth.";
        }
        break;
      }

      case "city":
        if (value.length < 1) {
          alertMessage = "Please select a valid city.";
        }
        break;

      case "street":
        if (!/^[א-ת\s]+$/.test(value)) {
          alertMessage = "Street name must be in Hebrew.";
        }
        break;

      case "houseNumber":
        if (value <= 0) {
          alertMessage = "House number must be a positive number.";
        }
        break;

      default:
        break;
    }

    if (alertMessage) {
      setGlobalAlert({ message: alertMessage, type: "error" });
    } else {
      setGlobalAlert(null); // Clear the global alert if the field is valid
    }

    return alertMessage === ""; // Return whether the field is valid
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const isValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key])
    );

    if (isValid) {
      setIsEditing(false);
      sessionStorage.setItem("currentUser", JSON.stringify(formData));
      setGlobalAlert({
        message: "Profile updated successfully!",
        type: "success",
      });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      ...formData,
      ...currentUser,
    });
    setGlobalAlert(null); // Clear alerts
  };

  return (
    <div className="profile-page">
      <Navbar />
      {/* Global Alert */}
      {globalAlert && (
        <UserAlert
          message={globalAlert.message}
          type={globalAlert.type || "error"} // Provide a default value for type
          onClose={() => setGlobalAlert(null)}
        />
      )}
      <div className="profile-container">
        <div className="profile-header">
          <div className="flex">
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="profile-image"
            />
            <div>
              <h2>
                {formData.lastName} {formData.firstName}
              </h2>
              <p>{currentUser.email || "No email provided"}</p>
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
                value={formData.username}
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
              name="favoriteWebSiteGameLink"
              value={formData.favoriteWebSiteGameLink}
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
