import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-hot-toast";

// Create a dark theme
const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "'Garamond', serif",
  },
});

// Style the order details
const OrderLabel = styled(Typography)({
  fontSize: "1.6rem",
  fontWeight: "bold",
  color: "orange",
});

const OrderValue = styled(Typography)({
  fontSize: "1.5rem",
});

// Style the order item list
const OrderItem = styled("li")({
  color: "#fff",
  fontSize: "1rem",
  margin: "0.5rem 0",
});

const ConfirmOrder = () => {
  const [menuItems, setMenuItems] = useState({ names: {}, prices: {} });
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menuitems");
        const data = await response.json();

        const itemNameMap = {};
        const itemPriceMap = {};
        data.forEach((item) => {
          itemNameMap[item.id] = item.name;
          itemPriceMap[item.id] = item.price;
        });

        setMenuItems({ names: itemNameMap, prices: itemPriceMap });
      } catch (err) {
        console.error("Error fetching menu items:", err);
      }
    };

    fetchMenuItems();
  }, []);

  if (!order) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      });

      if (response.ok) {
        toast.success("Your order has been placed!", {
          style: {
            position: "top-center",
            border: "1px solid orange",
            padding: "16px",
            color: "white",
            background: "black",
          },
          iconTheme: {
            primary: "orange",
            secondary: "black",
          },
          duration: 2500,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 5000);
      } else {
        console.error("Failed to create order");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
    }
  };

  const total = order.items.reduce((total, orderItem) => {
    const itemId = orderItem.id;
    const itemPrice = parseFloat(menuItems.prices[itemId]);
    if (itemPrice) {
      return total + orderItem.quantity * itemPrice;
    }
    return total;
  }, 0);

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="black" p={4} minHeight="100vh" color="white">
        <Typography variant="h4" gutterBottom>
          Confirm Your Order
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                backgroundColor: "black",
                color: "white",
                border: "1px solid orange",
              }}
            >
              <OrderLabel>Name:</OrderLabel>
              <OrderValue>{order.customer.name}</OrderValue>
              <OrderLabel>Email:</OrderLabel>
              <OrderValue>{order.customer.email}</OrderValue>
              <OrderLabel>Street:</OrderLabel>
              <OrderValue>{order.customer.street}</OrderValue>
              <OrderLabel>Postal Code:</OrderLabel>
              <OrderValue>{order.customer.postalCode}</OrderValue>
              <OrderLabel>City:</OrderLabel>
              <OrderValue>{order.customer.city}</OrderValue>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                backgroundColor: "black",
                color: "white",
                border: "1px solid orange",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: "1.6rem", fontWeight: "bold", color: "orange" }}
              >
                Order Items
              </Typography>
              <ul>
                {order.items.map((item) => {
                  return (
                    <OrderItem
                      key={item.id}
                      sx={{ fontFamily: "Garamond", fontSize: "1.5rem" }}
                    >
                      {menuItems.names[item.id]}: x{item.quantity}
                    </OrderItem>
                  );
                })}
              </ul>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: "1.6rem", fontWeight: "bold", color: "orange" }}
              >
                Total Price: ${total.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            type="submit"
            variant="outlined"
            onClick={handleClick}
            sx={{
              fontSize: "1.2rem",
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "transparent",
                color: "orange",
                borderColor: "orange",
                transition: "0.3s ease-in",
              },
            }}
          >
            Confirm Order
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ConfirmOrder;
