import React, { useState, useEffect } from "react";
import getAllUsers from "../utils/api";

let userData = {};

const Users = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((result) => {
        setUserData(result.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ul className="users">
      {userData.map((user, index) => {
        return (
          <button key={index} className="user">
            <h2>{user.username}</h2>
            <img src={user.avatar_url} alt="user avatar" />
          </button>
        );
      })}
    </ul>
  );
};
export default Users;
