import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "../../styling/Menu.css";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/menuitems`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <div className="menu">
      <h2 className="menu-header">Main Dishes</h2>
      {items
        .filter((item) => item.category === "main")
        .map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      <h2 className="menu-header">Desserts</h2>
      {items
        .filter((item) => item.category === "dessert")
        .map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
    </div>
  );
};

export default Menu;
