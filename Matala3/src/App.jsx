import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for the homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Other routes */}
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/profile-page" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
