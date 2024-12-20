import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../../assets/images/login-image.png";
import UserAlert from "../UserAlert/UserAlert.jsx";
import "./style.css";
import "../../general.css";

const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return {
      success: true,
      user, // Return the full user object
      message: "Login successful!",
    };
  } else if (username === "admin" && password === "ad12343211ad") {
    // Admin credentials
    return {
      success: true,
      user: { username: "admin", role: "admin" }, // Provide necessary details for the admin
      message: "Admin login successful!",
    };
  } else {
    return {
      success: false,
      user: null, // Return null for user when login fails
      message: "Invalid username or password!",
    };
  }
};

const LoginPage = () => {
  console.log(JSON.parse(localStorage.getItem("users")));

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [alerts, setAlerts] = useState({
    username: "",
    password: "",
  });

  const [globalAlert, setGlobalAlert] = useState({
    message: "",
    type: "error",
  });

  const validateField = (name, value) => {
    let alertMessage = "";

    if (name === "username") {
      if (!/^[A-Za-z0-9!@#$%^&*()_+=-]{1,60}$/.test(value)) {
        alertMessage =
          "Username must be up to 60 characters and contain only letters, numbers, and special characters.";
      }
    }

    if (name === "password") {
      if (
        !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,12}$/.test(
          value
        )
      ) {
        alertMessage =
          "Password must be 7–12 characters long, include a number, a special character, and an uppercase letter.";
      }
    }

    setAlerts((prevAlerts) => ({
      ...prevAlerts,
      [name]: alertMessage,
    }));

    return alertMessage === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isUsernameValid = validateField("username", formData.username);
    const isPasswordValid = validateField("password", formData.password);

    if (isUsernameValid && isPasswordValid) {
      const result = loginUser(formData.username, formData.password);

      setGlobalAlert({
        message: result.message,
        type: result.success ? "success" : "error",
      });

      if (result.success) {
        const currentUser = {
          ...result.user,
        };
        console.log("Current User:", currentUser);
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

        if (result.user?.username === "admin") {
          navigate("/Sysadmin");
        } else {
          navigate("/profile-page");
        }
      }
    }
  };

  return (
    <div className="main">
      {/* Global Alert */}
      {globalAlert.message && (
        <UserAlert
          message={globalAlert.message}
          type={globalAlert.type}
          onClose={() => setGlobalAlert({ message: "", type: "error" })}
        />
      )}
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <p>Login to access your account.</p>
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
                <small className="inline-alert">{alerts.username}</small>
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
                <small className="inline-alert">{alerts.password}</small>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>

          {/* Link to Register */}
          <p className="login-link">
            Don’t have an account? <Link to="/register-page">Sign Up</Link>
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="login-image">
          <img src={loginImage} alt="Login illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
