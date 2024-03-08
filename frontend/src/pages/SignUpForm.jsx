import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
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

  const handleSignUpSubmit = (values) => {
    console.log("Sign Up Form Submitted:", values);
    navigate("/login"); // Use navigate for redirection
  };

  return (
    <Form
      fields={fields}
      submitHandler={handleSignUpSubmit}
      submitLabel="Sign Up"
      title="Sign Up"
    />
  );
};

export default SignUpForm;
