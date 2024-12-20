import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "../../general.css";
import logo from "../../../assets/images/logo.png";
import bubbles from "../../../assets/images/bubbles-big.png";

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>Matala3</h1>
        </div>
        <div className="buttons">
          <button className="btn create-account">
            <Link to="/register-page">Create Account</Link>
          </button>
          <button className="btn login">
            <Link to="/login-page">Log in</Link>
          </button>
        </div>
      </header>
      <main className="home-main">
        <div className="welcome-text">
          <h1 className="title-header">Welcome to Matala 3</h1>
          <p>Please connect to a user or create a new user.</p>
        </div>
        <div className="image-bubbles">
          <img src={bubbles} alt="bubbles" />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
