import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchUserData(parsedUser.id, parsedUser.token);
    }
  }, []);

  const fetchUserData = (userId, token) => {
    fetch(`http://localhost:5000/api/users/details/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser((prevUser) => ({ ...prevUser, ...data }));
        localStorage.setItem("user", JSON.stringify({ ...user, ...data }));
      })
      .catch((error) => console.error("Failed to fetch user details:", error));
  };

  const setUserAndStore = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    fetchUserData(userData.id, userData.token);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: setUserAndStore, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
