import React, { useState, useContext } from "react";
import { TextField, Button, InputLabel } from "@mui/material";
import CartContext from "../components/CartContext";
import "../styling/OrderForm.css";

const OrderForm = () => {
  const { cartItems } = useContext(CartContext);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });
  const [touched, setTouched] = useState(false);

  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(customer).every((value) => value !== "")) {
      const order = {
        order: {
          customer: {
            name: customer.name,
            email: customer.email,
            street: customer.street,
            "postal-code": customer.postalCode,
            city: customer.city,
          },
          items: Object.keys(cartItems).map((itemId) => ({
            id: itemId,
            quantity: cartItems[itemId],
          })),
        },
      };

      fetch("https://reactdinebackend.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Order created!") {
            // Save the order data to local storage
            localStorage.setItem(
              "order",
              JSON.stringify({ order: order.order })
            );

            // Redirect to the order confirmation page
            window.location.href = "/confirm-order";
          } else {
            console.error("Failed to create order:", data);
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      setTouched(true);
    }
  };

  const textFieldStyles = {
    "& label.Mui-focused": { color: "white" },
    "& .MuiInput-underline:after": { borderBottomColor: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
    "& .MuiInputBase-input": { color: "white" },
  };

  return (
    <div className="order-form">
      <h2>Order Info</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={customer.name}
          onChange={handleChange}
          required
          error={customer.name === "" && touched}
          helperText={customer.name === "" && touched ? "Name is required" : ""}
          sx={textFieldStyles}
          InputLabelProps={{ shrink: true, style: { color: "white" } }}
        >
          <InputLabel style={{ color: "white" }}>Name</InputLabel>
        </TextField>

        <TextField
          label="Email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          required
          error={customer.email === "" && touched}
          helperText={
            customer.email === "" && touched ? "Email is required" : ""
          }
          sx={textFieldStyles}
          InputLabelProps={{ shrink: true, style: { color: "white" } }}
        >
          <InputLabel style={{ color: "white" }}>Email</InputLabel>
        </TextField>

        <TextField
          label="Street"
          name="street"
          value={customer.street}
          onChange={handleChange}
          required
          error={customer.street === "" && touched}
          helperText={
            customer.street === "" && touched ? "Street is required" : ""
          }
          sx={textFieldStyles}
          InputLabelProps={{ shrink: true, style: { color: "white" } }}
        >
          <InputLabel style={{ color: "white" }}>Street</InputLabel>
        </TextField>

        <TextField
          label="Postal Code"
          name="postalCode"
          value={customer.postalCode}
          onChange={handleChange}
          required
          error={customer.postalCode === "" && touched}
          helperText={
            customer.postalCode === "" && touched
              ? "Postal Code is required"
              : ""
          }
          sx={textFieldStyles}
          InputLabelProps={{ shrink: true, style: { color: "white" } }}
        >
          <InputLabel style={{ color: "white" }}>Postal Code</InputLabel>
        </TextField>

        <TextField
          label="City"
          name="city"
          value={customer.city}
          onChange={handleChange}
          required
          error={customer.city === "" && touched}
          helperText={customer.city === "" && touched ? "City is required" : ""}
          sx={textFieldStyles}
          InputLabelProps={{ shrink: true, style: { color: "white" } }}
        >
          <InputLabel style={{ color: "white" }}>City</InputLabel>
        </TextField>

        <Button
          type="submit"
          variant="outlined"
          sx={{
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
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
