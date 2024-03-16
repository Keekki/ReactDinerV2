import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { UserContextProvider } from "./UserContext";

describe("LoginForm", () => {
  test("renders and can interact with the form", () => {
    render(
      <MemoryRouter>
        <UserContextProvider>
          <LoginForm />
        </UserContextProvider>
      </MemoryRouter>
    );

    // Check if the Email input is rendered
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    // Simulate typing into the Email input
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    expect(emailInput.value).toBe("user@example.com");

    // Check if the Password input is rendered
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    // Simulate typing into the Password input
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(passwordInput.value).toBe("password");

    // Check if the submit button is rendered and can be clicked
    const submitButton = screen.getByRole("button", { name: /Log In!/i });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
  });
});

describe("SignUpForm", () => {
  test("renders and can interact with the form", () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    // Check if the Name input is rendered
    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameInput).toBeInTheDocument();

    // Simulate typing into the Name input
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    // Check if the Email input is rendered
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    // Simulate typing into the Email input
    fireEvent.change(emailInput, { target: { value: "John@example.com" } });
    expect(emailInput.value).toBe("John@example.com");

    // Check if the Street input is rendered
    const streetInput = screen.getByLabelText(/Street/i);
    expect(streetInput).toBeInTheDocument();

    // Simulate typing into the Street input
    fireEvent.change(streetInput, { target: { value: "Kuntokatu" } });
    expect(streetInput.value).toBe("Kuntokatu");

    // Check if the PostalCode input is rendered
    const PostalCodeInput = screen.getByLabelText(/Postal Code/i);
    expect(PostalCodeInput).toBeInTheDocument();

    // Simulate typing into the PostalCode input
    fireEvent.change(PostalCodeInput, { target: { value: "33520" } });
    expect(PostalCodeInput.value).toBe("33520");

    // Check if the City input is rendered
    const CityInput = screen.getByLabelText(/City/i);
    expect(CityInput).toBeInTheDocument();

    // Simulate typing into the City input
    fireEvent.change(CityInput, { target: { value: "Tampere" } });
    expect(CityInput.value).toBe("Tampere");

    // Check if the submit button is rendered and can be clicked
    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
  });
});
