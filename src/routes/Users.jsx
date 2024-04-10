import React, { useState, useEffect } from "react";
import { getAllUsers, makeUserDefault } from "../utils/api";
import { useUser } from "../components/UserContext";

const Users = ({ onToggleUserList }) => {
  const [userData, setUserData] = useState([]);
  const { setSelectedUser } = useUser();

  useEffect(() => {
    getAllUsers()
      .then((result) => {
        setUserData(result.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSetDefaultUser = (username) => {
    makeUserDefault(username)
      .then(() => {
        console.log(`>>> ${username} is now the default user.`);
        setSelectedUser(username);
        getAllUsers()
          .then((result) => {
            setUserData(result.users);
          })
          .catch((error) => {
            console.error(error);
          });
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
          onClick={() => {
            handleSetDefaultUser(user.username);
            onToggleUserList();
          }}
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
