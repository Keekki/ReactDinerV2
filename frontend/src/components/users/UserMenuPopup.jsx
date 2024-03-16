import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "./UserContext";
import "../../styling/Header.css";

const UserMenuPopup = ({ handleLogout }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="user-menu-popup">
      <a>Your account:</a>
      {user && user.admin && (
        <>
          <Link to="/add-menu-item" className="admin-button">
            Add Menu Item
          </Link>
          <Link to="/delete-menu-item" className="admin-button">
            Delete Menu Item
          </Link>
          <Link to="/edit-menu-item" className="admin-button">
            Edit Menu Item
          </Link>
        </>
      )}
      <button onClick={handleLogout} className="logout-button">
        Log Out
        <FontAwesomeIcon icon={faRightFromBracket} className="logout-icon" />
      </button>
    </div>
  );
};

export default UserMenuPopup;
