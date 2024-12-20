import React, { useState } from "react";
import PropTypes from "prop-types";
import editIcon from "../../../assets/images/Edit.png";
import deleteIcon from "../../../assets/images/Delete.png";

function UserRow({ user, onEdit, onDelete, onAlert }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    const isValid = Object.entries(editedUser).every(([key, value]) =>
      validateField(key, value)
    );

    if (isValid) {
      setIsEditing(false);
      onEdit(editedUser);
      onAlert("User updated successfully!");
    } else {
      onAlert("Validation failed. Please fix the errors before saving.");
    }
  };

  const validateField = (name, value) => {
    let isValid = true;

    switch (name) {
      case "username":
        isValid = /^[A-Za-z0-9!@#$%^&*()_+=-]{1,60}$/.test(value);
        break;

      case "email":
        isValid =
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value) &&
          value.endsWith(".com");
        break;

      case "firstName":
      case "lastName":
        isValid = /^[A-Za-z]+$/.test(value);
        break;

      case "dateOfBirth": {
        const today = new Date();
        const selectedDate = new Date(value);
        isValid =
          !isNaN(selectedDate) &&
          selectedDate <= today &&
          selectedDate.getFullYear() >= 1900;
        break;
      }

      case "city":
        isValid = value.trim().length > 0;
        break;

      case "street":
        isValid = /^[א-ת\s]+$/.test(value); // Hebrew letters only
        break;

      case "houseNumber":
        isValid = parseInt(value, 10) > 0;
        break;

      default:
        break;
    }

    return isValid;
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="date"
              name="dateOfBirth"
              value={editedUser.dateOfBirth}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="city"
              value={editedUser.city}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="street"
              value={editedUser.street}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="houseNumber"
              value={editedUser.houseNumber}
              onChange={handleChange}
            />
          </td>
          <td className="actions">
            <button onClick={handleSave} className="btn save-btn">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn cancel-btn"
            >
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.firstName}</td>
          <td>{user.dateOfBirth}</td>
          <td>{user.city}</td>
          <td>{user.street}</td>
          <td>{user.houseNumber}</td>
          <td className="actions">
            <button onClick={() => setIsEditing(true)} className="btn edit-btn">
              <img src={editIcon} alt="Edit" />
            </button>
            <button
              onClick={() => onDelete(user.email)}
              className="btn delete-btn"
            >
              <img src={deleteIcon} alt="Delete" />
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAlert: PropTypes.func.isRequired,
};

export default UserRow;
