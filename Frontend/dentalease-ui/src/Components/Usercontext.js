import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : { user_id: null, user_type: null, user_name: null };
  });

  const setUser = (user_id, user_type, user_name) => {
    const newUser = { user_id, user_type, user_name };
    setUserData(newUser);
    localStorage.setItem("userData", JSON.stringify(newUser)); // Store user data in local storage
  };

  return (
    <UserContext.Provider value={{ userData, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
