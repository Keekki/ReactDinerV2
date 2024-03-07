import React from "react";
import Form from "../components/Form";

const SignUpForm = ({ onSubmit }) => {
  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", required: true, type: "email" },
    { name: "street", label: "Street", required: true },
    { name: "postalCode", label: "Postal Code", required: true },
    { name: "city", label: "City", required: true },
    { name: "password", label: "Password", required: true, type: "password" },
    {
      name: "passwordConfirmation",
      label: "Confirm Password",
      required: true,
      type: "password",
    },
  ];

  return (
    <Form
      fields={fields}
      onSubmit={onSubmit}
      submitLabel="Sign Up"
      title="Sign Up"
    />
  );
};

export default SignUpForm;
