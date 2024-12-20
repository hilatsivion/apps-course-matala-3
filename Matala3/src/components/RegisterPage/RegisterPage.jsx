import React from "react";
import { Link } from "react-router-dom";
import registerImage from "../../../assets/images/registar-image.png";
import "./style.css";
import "../../general.css";

const RegisterPage = () => {
  return (
    <div className="main">
      <div className="register-container">
        <div className="register-image">
          <img src={registerImage} alt="Sign up image" />
        </div>
        <div className="register-form">
          <h1>Sign Up</h1>
          <p>
            Let’s get you all set up so you can access your personal account.
          </p>
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

            {/* Confirm Password */}
            <div>
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••••••" required />
            </div>

            {/* Upload Image */}
            <div>
              <label>Profile Picture</label>
              <input type="file" required />
            </div>

            {/* First Name & Last Name */}
            <div className="input-group">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label>Email</label>
              <input type="email" placeholder="example@gmail.com" required />
            </div>

            {/* Date of Birth */}
            <div>
              <label>Date of Birth</label>
              <input type="date" required />
            </div>

            {/* City & Street Name */}
            <div className="input-group">
              <div>
                <label>City</label>
                <input type="text" placeholder="Enter your city" required />
              </div>
              <div>
                <label>Street Name</label>
                <input
                  type="text"
                  placeholder="Enter your street name"
                  required
                />
              </div>
            </div>

            {/* House Number */}
            <div>
              <label>House Number</label>
              <input
                type="number"
                placeholder="Enter your house number"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary">
              Create Account
            </button>

            {/* Link to Login */}
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
