import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate(); // Use useNavigate
  const fields = [
    { name: "email", label: "Email", required: true, type: "email" },
    { name: "password", label: "Password", required: true, type: "password" },
  ];

  const handleLoginSubmit = (values) => {
    console.log("Login Form Submitted:", values);
    navigate("/"); // Use navigate for redirection
  };

  return (
    <Form
      fields={fields}
      submitHandler={handleLoginSubmit}
      submitLabel="Log In!"
      title="Log In!"
    />
  );
};

export default LoginForm;
