import React from "react";
import { Link } from "react-router-dom";
import loginImage from "../../../assets/images/login-image.png";
import "./style.css";
import "../../general.css";

const LoginPage = () => {
  return (
    <div className="main">
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <p>Login to access your account.</p>
          <form>
            {/* Username */}
            <div>
              <label>Username</label>
              <input type="text" placeholder="Enter your username" required />
            </div>

            {/* Password */}
            <div>
              <label>Password</label>
              <input type="password" placeholder="••••••••••••" required />
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
