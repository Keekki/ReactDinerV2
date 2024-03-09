import React, { useState } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // State to hold any error messages
  const fields = [
    { name: "email", label: "Email", required: true, type: "email" },
    { name: "password", label: "Password", required: true, type: "password" },
  ];

  const handleLoginSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status === 200) {
        // On successful login, redirect the user
        navigate("/");
        toast.success("Logged in!", {
          style: {
            border: "1px solid orange",
            padding: "16px",
            color: "white",
            background: "black",
            marginLeft: "1100px",
          },
          iconTheme: {
            primary: "orange",
            secondary: "black",
          },
        });
      } else {
        // Handle unexpected status codes
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If the server responds with a 401 status, it means the credentials are incorrect
        setError("Incorrect email or password.");
      } else {
        // For any other error, display a generic error message
        setError("An error occurred while logging in. Please try again.");
      }
    }
  };

  return (
    <Form
      fields={fields}
      submitHandler={handleLoginSubmit}
      submitLabel="Log In!"
      title="Log In!"
      error={error} // Pass the error state to the Form component
    />
  );
};

export default LoginForm;
