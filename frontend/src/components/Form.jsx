import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../styling/Form.css";

const Form = ({ fields, onSubmit, submitLabel, title }) => {
  const [values, setValues] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // Track if the form has been submitted

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
    }
  };

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
    </div>
  );
};

export default Form;
