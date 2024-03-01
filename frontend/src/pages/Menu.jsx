import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "../styling/Menu.css";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/menuitems")
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

  const mainDishes = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20,
  ];
  const desserts = [12, 15, 19];

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
    ); // Show CircularProgress when loading
  }

  return (
    <div className="menu">
      <h2 className="menu-header">Main dishes</h2>
      {items
        .filter((item) => mainDishes.includes(item.id))
        .map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      <h2 className="menu-header">Desserts</h2>
      {items
        .filter((item) => desserts.includes(item.id))
        .map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
    </div>
  );
};

export default Menu;
