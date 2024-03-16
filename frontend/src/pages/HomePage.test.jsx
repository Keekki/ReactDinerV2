import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";

// Mocking the BackgroundVideo component
vi.mock("../components/BackgroundVideo", () => ({
  default: () => <div>BackgroundVideo</div>,
}));

describe("HomePage", () => {
  it("renders HomePage correctly", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(
      screen.getByText(/Welcome to Our Authentic React Restaurant!/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Check Menu")).toBeInTheDocument();
    expect(screen.getByText("BackgroundVideo")).toBeInTheDocument(); // Mocked BackgroundVideo component
  });
});
