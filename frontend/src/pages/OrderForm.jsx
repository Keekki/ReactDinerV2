import React, { useContext } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import CartContext from "../components/cart/CartContext";
import { UserContext } from "../components/users/UserContext";

const OrderForm = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(UserContext); // Consuming user data from UserContext

  const fields = user
    ? [
        { name: "name", label: "Name", required: true, value: user.name || "" },
        {
          name: "email",
          label: "Email",
          required: true,
          value: user.email || "",
        },
        {
          name: "street",
          label: "Street",
          required: true,
          value: user.street || "",
        },
        {
          name: "postalCode",
          label: "Postal Code",
          required: true,
          value: user.postalCode || "",
        },
        { name: "city", label: "City", required: true, value: user.city || "" },
      ]
    : [];

  const handleOrderSubmit = (values) => {
    const orderData = {
      customer: values,
      items: Object.keys(cartItems).map((itemId) => ({
        id: itemId,
        quantity: cartItems[itemId],
      })),
    };
    navigate("/confirm-order", { state: { order: orderData } });
  };

  return (
    <Form
      fields={fields}
      submitHandler={handleOrderSubmit}
      submitLabel="Proceed to Confirmation"
      title="Customer Info"
    />
  );
};

export default OrderForm;
