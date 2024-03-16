import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styling/Form.css";

const Form = ({ fields, submitHandler, submitLabel, title }) => {
  // Initialize the form values state based on the fields prop
  const [values, setValues] = useState(
    fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.value || "" }),
      {}
    )
  );
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Update form values state when fields prop changes
  useEffect(() => {
    setValues(
      fields.reduce(
        (acc, field) => ({ ...acc, [field.name]: field.value || "" }),
        {}
      )
    );
  }, [fields]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    fields.forEach((field) => {
      const fieldValue = values[field.name];
      if (typeof fieldValue === "string" && fieldValue.trim() === "") {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (
      fields.some((field) => field.name === "passwordConfirmation") &&
      values.password !== values.passwordConfirmation
    ) {
      newErrors.passwordConfirmation = "Passwords do not match.";
    }

    // Only proceed with submitHandler if there are no new errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await submitHandler(values); // Await the submitHandler call

        if (response && response.status === 401) {
          newErrors.password = "Password is incorrect.";
        } else if (response && response.status === 200) {
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
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle the error appropriately in UI
        toast.error("An error occurred. Please try again.");
      }
    }

    setErrors(newErrors);
    setSubmitted(true);
  };

  useEffect(() => {
    const h2Element = document.querySelector(".form h2");
    if (h2Element) {
      if (h2Element.textContent === "Customer Info") {
        h2Element.style.marginLeft = "-150px";
      } else if (h2Element.textContent === "Log In!") {
        h2Element.style.marginLeft = "-220px";
      } else if (h2Element.textContent === "Sign Up") {
        h2Element.style.marginLeft = "-215px";
      }
    }
  }, [title]);

  return (
    <div className="form">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            required={field.required}
            type={field.type || "text"}
            error={submitted && !!errors[field.name]} // Ensure error is a boolean
            helperText={
              submitted && errors[field.name] ? errors[field.name] : ""
            }
            InputLabelProps={{ shrink: true, style: { color: "white" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
        ))}
        <Button
          type="submit"
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              backgroundColor: "transparent",
              color: "orange",
              borderColor: "orange",
              transition: "0.3s ease-in",
            },
          }}
        >
          {submitLabel}
        </Button>
      </form>
      {location.pathname === "/login" && ( // Conditionally render the link if the current path is /login
        <Link
          to="/signup"
          style={{
            color: "orange",
            textDecoration: "none",
            display: "block",
            marginTop: "20px",
          }}
        >
          Don't have an account? Create one here!
        </Link>
      )}
    </div>
  );
};

export default Form;
