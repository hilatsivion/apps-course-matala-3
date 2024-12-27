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

  // update the local storage with the updated users list
  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
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

  // update the table and save changes in storage
  const handleEdit = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );

    // Update localStorage - users list
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
