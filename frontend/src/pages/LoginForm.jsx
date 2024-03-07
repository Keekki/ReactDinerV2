import React from "react";
import Form from "../components/Form";

const LoginForm = ({ onSubmit }) => {
  const fields = [
    { name: "email", label: "Email", required: true, type: "email" },
    { name: "password", label: "Password", required: true, type: "password" },
  ];

  return (
    <Form
      fields={fields}
      onSubmit={onSubmit}
      submitLabel="Log In!"
      title="Log In!"
    />
  );
};

export default LoginForm;
