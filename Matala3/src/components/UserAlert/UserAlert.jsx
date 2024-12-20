import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const UserAlert = ({ message, type = "error", onClose }) => {
  if (!message) return null;

  const alertClass = `user-alert user-alert-${type}`;

  return (
    <div className={alertClass} role="alert">
      <span>{message}</span>
      <button
        className="user-alert-close"
        onClick={onClose}
        aria-label="Close alert"
      >
        &times;
      </button>
    </div>
  );
};

UserAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "success"]),
  onClose: PropTypes.func.isRequired,
};

export default UserAlert;
