import React from "react";

function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>
      <td>
        <div className="user-info">
          <img
            src={user.profileImage}
            alt="Profile"
            className="profile-image"
          />
          <span>{user.username}</span>
        </div>
      </td>
      <td>{user.email}</td>
      <td>{user.fullName}</td>
      <td>{user.birthdate}</td>
      <td>{user.address}</td>
      <td className="actions">
        <button onClick={() => onEdit(user.id)} className="btn edit-btn">
          <img src="../../../assets/images/Edit.png" />
        </button>
        <button onClick={() => onDelete(user.id)} className="btn delete-btn">
          <img src="../../../assets/images/Delete.png" />
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
