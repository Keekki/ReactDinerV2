import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Link, useLocation, useHistory } from "react-router-dom";
import "../styling/Form.css";

const Form = ({ fields, onSubmit, submitLabel, title }) => {
  const [values, setValues] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // Track if the form has been submitted
  const history = useHistory(); // Get the history instance
  const location = useLocation(); // Get the current location

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !values[field.name].trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    // Check if passwords match for sign-up form
    if (
      fields.some((field) => field.name === "passwordConfirmation") &&
      values.password !== values.passwordConfirmation
    ) {
      newErrors.passwordConfirmation = "Passwords do not match.";
    }
    setErrors(newErrors);
    setSubmitted(true); // Set submitted to true after attempting to submit
    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
      // Redirect based on the current path
      if (location.pathname === "/signup") {
        history.push("/login");
      } else if (location.pathname === "/login") {
        history.push("/");
      } else if (location.pathname === "/order") {
        history.push("/confirm-order");
      }
    }
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
            type={field.type}
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
