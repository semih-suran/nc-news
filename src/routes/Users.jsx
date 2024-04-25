import React, { useState, useEffect, useRef } from "react";
import { getAllUsers, makeUserDefault } from "../utils/api";
import { useUser } from "../components/UserContext";

const Users = ({ onToggleUserList }) => {
  const [userData, setUserData] = useState([]);
  const { setSelectedUser, setSelectedUserAvatar } = useUser();
  const userListRef = useRef(null);

  useEffect(() => {
    getAllUsers()
      .then((result) => {
        setUserData(result.users);
      })
      .catch((error) => {
        console.error(error);
      });
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (userListRef.current && !userListRef.current.contains(event.target)) {
      onToggleUserList();
    }
  };

  const handleSetDefaultUser = (user) => {
    makeUserDefault(user.username)
      .then(() => {
        setSelectedUser(user.username);
        setSelectedUserAvatar(user.avatar_url);
        onToggleUserList();
      })
      .catch((error) => {
        console.error("Failed to set default user:", error);
      });
  };

  return (
    <ul className="users" ref={userListRef}>
      {userData.map((user, index) => (
        <button
          key={index}
          className="user"
          onClick={() => handleSetDefaultUser(user)}
        >
          <h2>{user.name}</h2>
          <img src={user.avatar_url} alt="user avatar" />
        </button>
      ))}
      <button id="cancel-button" className="user" onClick={onToggleUserList}>
        Cancel
      </button>
    </ul>
  );
};

export default Users;
