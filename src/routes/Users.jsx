import React, { useState, useEffect } from "react";
import { getAllUsers, makeUserDefault } from "../utils/api";
import { useUser } from "../components/UserContext";

const Users = ({ onToggleUserList }) => {
  const [userData, setUserData] = useState([]);
  const { setSelectedUser, setSelectedUserAvatar } = useUser(); // Add setSelectedUserAvatar

  useEffect(() => {
    getAllUsers()
      .then((result) => {
        setUserData(result.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSetDefaultUser = (user) => { // Modify handleSetDefaultUser to accept user object
    makeUserDefault(user.username)
      .then(() => {
        console.log(`>>> ${user.username} is now the default user.`);
        setSelectedUser(user.username);
        setSelectedUserAvatar(user.avatar_url); // Update selectedUserAvatar
        onToggleUserList(); // Move onToggleUserList here
      })
      .catch((error) => {
        console.error("Failed to set default user:", error);
      });
  };

  return (
    <ul className="users">
      {userData.map((user, index) => (
        <button
          key={index}
          className="user"
          onClick={() => handleSetDefaultUser(user)} // Pass user object to handleSetDefaultUser
        >
          <h2>{user.username}</h2>
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
