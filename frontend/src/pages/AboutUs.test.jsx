import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutUs from "./AboutUs";

describe("AboutUs", () => {
  it("renders correctly and contains expected content", () => {
    render(<AboutUs />);

    // Check if the header is rendered with correct text
    expect(
      screen.getByRole("heading", { name: /About the React Dine/i })
    ).toBeInTheDocument();

    // Check if the main content paragraph is present
    expect(
      screen.getByText(
        /This is a web development project presenting a website for a restaurant./i
      )
    ).toBeInTheDocument();

    // Check if the footer contains the correct text using a function matcher
    expect(
      screen.getByText((content, node) => {
        const hasText = (node) =>
          node.textContent === "Made by Matias Frimodig";
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        );

        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  });
});
