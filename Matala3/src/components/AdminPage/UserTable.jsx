import React from "react";
import PropTypes from "prop-types";
import UserRow from "./UserRow.jsx";

function UserTable({ users, onEdit, onDelete, onAlert }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Date of Birth</th>
          <th>City</th>
          <th>Street</th>
          <th>House Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.email}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
            onAlert={onAlert}
          />
        ))}
      </tbody>
    </table>
  );
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      houseNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAlert: PropTypes.func.isRequired,
};

export default UserTable;
