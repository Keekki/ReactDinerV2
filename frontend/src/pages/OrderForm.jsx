import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const navigate = useNavigate();
  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", required: true },
    { name: "street", label: "Street", required: true },
    { name: "postalCode", label: "Postal Code", required: true },
    { name: "city", label: "City", required: true },
  ];

  const handleOrderSubmit = (values) => {
    // Ordering logic is still missing from the backend
    console.log("Order Form Submitted:", values);
    navigate("/confirm-order");
  };

  return (
    <Form
      fields={fields}
      submitHandler={handleOrderSubmit}
      submitLabel="Place Order"
      title="Customer Info"
    />
  );
};

export default OrderForm;
