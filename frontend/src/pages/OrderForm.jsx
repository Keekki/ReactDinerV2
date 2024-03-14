import React, { useContext } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import CartContext from "../components/CartContext";

const OrderForm = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", required: true },
    { name: "street", label: "Street", required: true },
    { name: "postalCode", label: "Postal Code", required: true },
    { name: "city", label: "City", required: true },
  ];

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
