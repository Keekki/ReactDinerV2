import React from "react";
import Form from "../Form";
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

  const handleSignUpSubmit = async (values) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/signup`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (response.ok) {
      navigate("/login"); // Navigate to the login page
    } else {
      console.error("Signup didn't work");
    }
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
