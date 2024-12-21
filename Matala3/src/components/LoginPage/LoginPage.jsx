import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import loginImage from "../../../assets/images/login-image.png";
import Alert from "../Alert/AlertPopup.jsx";
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
      user,
      message: "Login successful!",
    };
  } else if (username === "admin" && password === "ad12343211ad") {
    return {
      success: true,
      user: { username: "admin", role: "admin" },
      message: "Admin login successful!",
    };
  } else {
    return {
      success: false,
      user: null,
      message: "Invalid username or password!",
    };
  }
};

const LoginPage = () => {
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
          "Can only contain letters, numbers, and special characters without spaces (max 60 chars).";
      }
    }

    if (name === "password") {
      if (
        !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,12}$/.test(
          value
        )
      ) {
        alertMessage =
          "Must be 7–12 characters long, include a number, a special character, and an uppercase letter.";
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

    const result = loginUser(formData.username, formData.password);

    setGlobalAlert({
      message: result.message,
      type: result.success ? "success" : "error",
    });

    if (result.success) {
      const currentUser = {
        ...result.user,
      };
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

      if (result.user?.username === "admin") {
        navigate("/admin-page");
      } else {
        navigate("/profile-page");
      }
    }
  };

  return (
    <div className="main">
      <Navbar />
      {globalAlert.message && (
        <Alert
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
                className="input-group"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              {alerts.username && (
                <div className="inline-alert error">{alerts.username}</div>
              )}
            </div>

            {/* Password */}
            <div>
              <label>Password</label>
              <input
                className="input-group"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {alerts.password && (
                <div className="inline-alert error">{alerts.password}</div>
              )}
            </div>

            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>

          <p className="login-link">
            Don’t have an account? <Link to="/register-page">Sign Up</Link>
          </p>
        </div>
        <div className="login-image">
          <img src={loginImage} alt="Login illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
