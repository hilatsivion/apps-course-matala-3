import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAlert from "../Alert/UserAlert.jsx";
import registerImage from "../../../assets/images/registar-image.png";
import "./style.css";
import "../../general.css";

const cities = [
  "Jerusalem",
  "Tel Aviv",
  "Haifa",
  "Rishon Lezion",
  "Petah Tikva",
  "Ashdod",
  "Netanya",
  "Beersheba",
  "Holon",
  "Bnei Brak",
  "Ramat Gan",
  "Ashkelon",
  "Bat Yam",
  "Rehovot",
  "Herzliya",
  "Kfar Saba",
  "Hadera",
  "Modiin-Maccabim-Reut",
  "Nazareth",
  "Lod",
  "Raanana",
  "Acre (Akko)",
  "Nahariya",
  "Kiryat Gat",
  "Eilat",
  "Kiryat Motzkin",
  "Kiryat Ono",
  "Kiryat Yam",
  "Tiberias",
  "Kiryat Shmona",
  "Sderot",
];

const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((u) => u.email === user.email)) {
    return { success: false, message: "Email already registered!" };
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true, message: "User registered successfully!" };
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [alerts, setAlerts] = useState({});
  const [globalAlert, setGlobalAlert] = useState({ message: "", type: "" }); // For global messages
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    city: "",
    street: "",
    houseNumber: "",
    favoriteWebSiteGameLink: "",
  });

  const handleCityInput = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, city: value });

    if (value.length > 0) {
      const matches = cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCities(matches);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (city) => {
    setFormData({ ...formData, city });
    setShowDropdown(false);
  };

  const validateField = (name, value) => {
    let alertMessage = "";
    const users = JSON.parse(localStorage.getItem("users")) || [];

    switch (name) {
      case "username":
        if (!/^[A-Za-z0-9!@#$%^&*()_+=-]{1,60}$/.test(value)) {
          alertMessage =
            "Username must be up to 60 characters and contain only letters, numbers, and special characters.";
        } else if (users.find((u) => u.username === value)) {
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

      case "confirmPassword":
        if (value !== formData.password) {
          alertMessage = "Passwords do not match.";
        }
        break;

      case "profilePicture":
        if (value) {
          // Extract the file name and validate the extension
          const fileName = value instanceof File ? value.name : value;
          if (!/\.(jpg|jpeg)$/i.test(fileName)) {
            alertMessage = "Only JPG or JPEG images are allowed.";
          }
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
        } else if (users.find((u) => u.email === value)) {
          alertMessage = "Email already registered!";
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

      case "favoriteWebSiteGameLink":
        if (!/^(http|https):\/\/[^ "]+$/.test(value)) {
          alertMessage = "Please enter a valid link.";
        }
        break;

      default:
        break;
    }

    setAlerts((prevAlerts) => ({
      ...prevAlerts,
      [name]: alertMessage,
    }));

    return alertMessage === "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key])
    );

    if (!isValid) {
      setGlobalAlert({
        message: "Please fix the errors before submitting.",
        type: "error",
      });
      return;
    }

    const user = {
      ...formData,
      profilePicture: formData.profilePicture,
    };

    delete user.confirmPassword;

    const result = registerUser(user);
    setGlobalAlert({
      message: result.message,
      type: result.success ? "success" : "error",
    });

    if (result.success) {
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        profilePicture: null,
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        city: "",
        street: "",
        houseNumber: "",
        favoriteWebSiteGameLink: "",
      });
      setAlerts({});
      navigate("/login-page");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    let fieldValue = value;

    if (type === "file" && files[0]) {
      fieldValue = URL.createObjectURL(files[0]);

      validateField(name, files[0].name);
    } else {
      validateField(name, fieldValue);
    }

    // Update formData
    setFormData({
      ...formData,
      [name]: fieldValue,
    });
  };

  return (
    <div className="main">
      {/* Global Alert */}
      {globalAlert.message && (
        <UserAlert
          message={globalAlert.message}
          type={globalAlert.type}
          onClose={() => setGlobalAlert({ message: "", type: "" })}
        />
      )}
      <div className="register-container">
        <div className="register-image">
          <img src={registerImage} alt="Sign up image" />
        </div>
        <div className="register-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              {alerts.username && (
                <small className="alert">{alerts.username}</small>
              )}
            </div>

            {/* Password */}
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
              />
              {alerts.password && (
                <small className="alert">{alerts.password}</small>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
              />
              {alerts.confirmPassword && (
                <small className="alert">{alerts.confirmPassword}</small>
              )}
            </div>

            {/* Profile Picture */}
            <div>
              <label>Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleChange}
                required
              />
              {alerts.profilePicture && (
                <small className="alert">{alerts.profilePicture}</small>
              )}
            </div>

            {/* First Name */}
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
              {alerts.firstName && (
                <small className="alert">{alerts.firstName}</small>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
              {alerts.lastName && (
                <small className="alert">{alerts.lastName}</small>
              )}
            </div>

            {/* Email */}
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />
              {alerts.email && <small className="alert">{alerts.email}</small>}
            </div>

            {/* Date of Birth */}
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              {alerts.dateOfBirth && (
                <small className="alert">{alerts.dateOfBirth}</small>
              )}
            </div>

            {/* City */}
            <div style={{ position: "relative" }}>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleCityInput}
                placeholder="Enter your city"
                autoComplete="off"
                required
              />
              {showDropdown && filteredCities.length > 0 && (
                <ul className="autocomplete-dropdown">
                  {filteredCities.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => handleCitySelect(city)}
                      className="autocomplete-item"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
              {alerts.city && <small className="alert">{alerts.city}</small>}
            </div>

            {/* Street */}
            <div>
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter your street"
                required
              />
              {alerts.street && (
                <small className="alert">{alerts.street}</small>
              )}
            </div>

            {/* House Number */}
            <div>
              <label>House Number</label>
              <input
                type="number"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder="Enter your house number"
                required
              />
              {alerts.houseNumber && (
                <small className="alert">{alerts.houseNumber}</small>
              )}
            </div>
            {/* Link To A Favorite Website Game */}
            <div>
              <label>Link To Your Favorite Game</label>
              <input
                type="text"
                name="favoriteWebSiteGameLink"
                value={formData.favoriteWebSiteGameLink}
                onChange={handleChange}
                placeholder="Enter a link to your favorite game"
                required
              />
              {alerts.favoriteWebSiteGameLink && (
                <small className="alert">
                  {alerts.favoriteWebSiteGameLink}
                </small>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="login-link">
              Already have an account? <Link to="/login-page">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
