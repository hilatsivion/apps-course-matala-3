import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Alert from "../Alert/AlertPopup.jsx";
import registerImage from "../../../assets/images/registar-image.png";
import { saveProfilePictureToIndexedDB } from "../../indexDB.jsx";
import "./register.css";
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

// Save user data to localStorage
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
  const [touched, setTouched] = useState({});
  const [globalAlert, setGlobalAlert] = useState({ message: "", type: "" });
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

  // validate all fields in the form
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

        if (isNaN(selectedDate.getTime())) {
          alertMessage = "Please enter a valid date.";
        } else if (selectedDate > today || selectedDate.getFullYear() < 1900) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.keys(formData).every((key) =>
      key === "profilePicture"
        ? validateField(key, formData.profilePicture)
        : validateField(key, formData[key])
    );

    if (!isValid) {
      setGlobalAlert({
        message: "Please fix the errors before submitting.",
        type: "error",
      });
      return;
    }

    // Save profile picture to IndexedDB if provided
    if (formData.profilePicture) {
      await saveProfilePictureToIndexedDB(
        formData.email,
        formData.profilePicture
      );
    }

    // Prepare user data without profile picture file
    const user = { ...formData };
    delete user.confirmPassword;
    delete user.profilePicture;

    // Save user data to localStorage
    registerUser(user);

    setGlobalAlert({
      message: "User registered successfully!",
      type: "success",
    });

    // Navigate to another page after a delay
    setTimeout(() => navigate("/login-page"), 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    let fieldValue = value;

    if (type === "file" && files[0]) {
      fieldValue = files[0];
      validateField(name, fieldValue.name);
    } else {
      validateField(name, fieldValue);
    }

    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  return (
    <div className="main">
      <Navbar />
      {globalAlert.message && (
        <Alert
          message={globalAlert.message}
          type={globalAlert.type}
          onClose={() => setGlobalAlert({ message: "", type: "" })}
        />
      )}
      <div className="register-container">
        <div className="register-image">
          <img src={registerImage} alt="Sign up illustration" />
        </div>
        <div className="register-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
                {touched.firstName && alerts.firstName && (
                  <div className="inline-alert error">{alerts.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
                {touched.lastName && alerts.lastName && (
                  <div className="inline-alert error">{alerts.lastName}</div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                />
                {touched.username && alerts.username && (
                  <div className="inline-alert error">{alerts.username}</div>
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                />
                {touched.email && alerts.email && (
                  <div className="inline-alert error">{alerts.email}</div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {touched.password && alerts.password && (
                  <div className="inline-alert error">{alerts.password}</div>
                )}
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {touched.confirmPassword && alerts.confirmPassword && (
                  <div className="inline-alert error">
                    {alerts.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
                {touched.dateOfBirth && alerts.dateOfBirth && (
                  <div className="inline-alert error">{alerts.dateOfBirth}</div>
                )}
              </div>
              <div className="form-group">
                <label>Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleChange}
                  required
                />
                {touched.profilePicture && alerts.profilePicture && (
                  <div className="inline-alert error">
                    {alerts.profilePicture}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="form-group" style={{ position: "relative" }}>
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
                {touched.city && alerts.city && (
                  <div className="inline-alert error">{alerts.city}</div>
                )}
              </div>
              <div className="form-group">
                <label>Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter your street"
                  required
                />
                {touched.street && alerts.street && (
                  <div className="inline-alert error">{alerts.street}</div>
                )}
              </div>
              <div className="form-group">
                <label>House Number</label>
                <input
                  type="number"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  placeholder="Enter your house number"
                  required
                />
                {touched.houseNumber && alerts.houseNumber && (
                  <div className="inline-alert error">{alerts.houseNumber}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Link To Your Favorite Game</label>
              <input
                type="text"
                name="favoriteWebSiteGameLink"
                value={formData.favoriteWebSiteGameLink}
                onChange={handleChange}
                placeholder="Enter a link to your favorite game"
                required
              />
              {touched.favoriteWebSiteGameLink &&
                alerts.favoriteWebSiteGameLink && (
                  <div className="inline-alert error">
                    {alerts.favoriteWebSiteGameLink}
                  </div>
                )}
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={Object.values(alerts).some((alert) => alert !== "")}
            >
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
