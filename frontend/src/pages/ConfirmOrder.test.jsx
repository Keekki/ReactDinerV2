import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ConfirmOrder from "./ConfirmOrder";

// Mocking fetch globally
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: "1", name: "Pizza", price: "10.00" }]),
  })
);

beforeEach(() => {
  // Reset fetch mock before each test
  global.fetch.mockClear();

  // Mock 'react-router-dom' to provide a default state
  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      ...actual,
      useLocation: vi.fn(() => ({
        state: {
          order: {
            customer: {
              name: "John Doe",
              email: "john@example.com",
              street: "123 Main St",
              postalCode: "12345",
              city: "Anytown",
            },
            items: [{ id: "1", quantity: 2 }],
          },
        },
      })),
    };
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ConfirmOrder", () => {
  it("checks if the page renders", () => {
    const { container } = render(
      <MemoryRouter>
        <ConfirmOrder />
      </MemoryRouter>
    );

    // Log the current state of the rendered container to help debug
    console.log(screen.debug());

    // Check if the container has any child elements
    expect(container.firstChild).not.toBeNull();
  });

  it("shows loading state when no order details are provided", async () => {
    // Override the `useLocation` mock for this specific test
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useLocation: vi.fn(() => ({})),
      };
    });

    render(
      <MemoryRouter>
        <ConfirmOrder />
      </MemoryRouter>
    );

    const progressBar = await screen.findByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });
});
