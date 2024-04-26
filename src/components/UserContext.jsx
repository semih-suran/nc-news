import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllUsers } from "../utils/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserAvatar, setSelectedUserAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const { users } = await getAllUsers();
        const defaultUser = users.find((user) => user.is_default) || users[0];
        setSelectedUser(defaultUser.username);
        setSelectedUserAvatar(defaultUser.avatar_url)
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  if (loading) {
    return <div className="loading">Server is currently waking from hibernation....</div>;
  }

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser, selectedUserAvatar, setSelectedUserAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
