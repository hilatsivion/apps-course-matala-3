import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import UserTable from "./UserTable.jsx";
import { deleteProfilePictureFromIndexedDB } from "../../indexDB"; // Import the delete function
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

  const updateSessionStorage = (updatedUser) => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser?.email === updatedUser.email) {
      sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const handleDelete = (email) => {
    // Remove the user from localStorage and session state
    const updatedUsers = users.filter((user) => user.email !== email);
    updateLocalStorage(updatedUsers);

    // Remove the profile picture from IndexedDB
    deleteProfilePictureFromIndexedDB(email)
      .then(() => console.log(`Profile picture for ${email} removed.`))
      .catch((error) =>
        console.error(`Failed to remove profile picture for ${email}:`, error)
      );
  };

  const handleEdit = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );

    // Update both localStorage and sessionStorage
    updateLocalStorage(updatedUsers);
    updateSessionStorage(updatedUser);
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
