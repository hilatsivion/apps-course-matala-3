import React from "react";
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
  const getCurrentUser = () => {
    const currentUser = sessionStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null;
  };

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
              condition={getCurrentUser() !== null}
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
              condition={getCurrentUser()?.username === "admin"}
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
