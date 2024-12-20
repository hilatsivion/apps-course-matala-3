import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import UserTable from "./UserTable.jsx";
import "./admin.css";

function AdminPage() {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleDelete = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    updateLocalStorage(updatedUsers);
  };

  const handleEdit = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    updateLocalStorage(updatedUsers);
  };

  const handleAlert = (message) => {
    alert(message);
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAlert={handleAlert}
        />
      </div>
    </div>
  );
}

export default AdminPage;
