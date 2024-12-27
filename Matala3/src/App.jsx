import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import AdminPage from "./components/AdminPage/AdminPage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Initialize state from sessionStorage
    const user = sessionStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    // Listener for changes in sessionStorage
    const handleStorageChange = () => {
      const user = sessionStorage.getItem("currentUser");
      setCurrentUser(user ? JSON.parse(user) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const ProtectedRoute = ({ children, redirectTo, condition }) => {
    return condition ? children : <Navigate to={redirectTo} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/register-page" element={<RegisterPage />} />

        {/* Protected Profile Page */}
        <Route
          path="/profile-page"
          element={
            <ProtectedRoute
              condition={currentUser !== null}
              redirectTo="/"
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Page */}
        <Route
          path="/admin-page"
          element={
            <ProtectedRoute
              condition={currentUser?.username === "admin"}
              redirectTo="/"
            >
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
