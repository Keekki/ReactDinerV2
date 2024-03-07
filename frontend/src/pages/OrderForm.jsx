import React from "react";
import Form from "../components/Form";

const OrderForm = ({ onSubmit }) => {
  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", required: true },
    { name: "street", label: "Street", required: true },
    { name: "postalCode", label: "Postal Code", required: true },
    { name: "city", label: "City", required: true },
  ];

  return (
    <Form
      fields={fields}
      onSubmit={onSubmit}
      submitLabel="Place Order"
      title="Customer Info"
    />
  );
};

export default OrderForm;
