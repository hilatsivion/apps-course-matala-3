import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/login-page" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
