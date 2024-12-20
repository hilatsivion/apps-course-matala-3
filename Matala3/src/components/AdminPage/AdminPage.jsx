import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import UserTable from "./UserTable.jsx";
import "./style.css";

function AdminPage() {
  const [users, setUsers] = useState([
    // TODO: we need to get the users json
    {
      email: "hila@gmail.com",
      username: "Matthew Wilson",
      fullName: "Blah Blah",
      birthdate: "06-03-2021",
      address: "123 Street, City",
      profileImage: "https://via.placeholder.com/40",
    },
    {
      email: "sarah@gmail.com",
      username: "Sarah Martin",
      fullName: "Sarah Martin",
      birthdate: "12-01-2022",
      address: "456 Avenue, City",
      profileImage: "https://via.placeholder.com/40",
    },
  ]);

  // Admin deletes a user from the "database"
  const handleDelete = (email) => {
    // TODO: delete from view & delete from our data
    setUsers(users.filter((user) => user.email !== email));
  };

  // Admin edits the user info
  const handleEdit = (email) => {
    console.log("Edit user with email:", email);
    // TODO: Add functionality for editing the user
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default AdminPage;
