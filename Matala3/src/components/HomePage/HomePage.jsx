import React from "react";
import "./style.css";
import "../../general.css";
import Navbar from "../Navbar/Navbar.jsx";
import bubbles from "../../../assets/images/bubbles-big.png";

function HomePage() {
  return (
    <div className="home-container">
      <Navbar />
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
