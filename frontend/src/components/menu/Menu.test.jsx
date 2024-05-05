import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Menu from "./Menu";
import CartContext from "../cart/CartContext";

// Mock data for menu items
const mockMenuItems = [
  {
    id: 1,
    name: "Pizza",
    description: "Delicious pizza",
    price: "10",
    category: "main",
    image: "pizza.jpg",
  },
  {
    id: 2,
    name: "Ice Cream",
    description: "Creamy ice cream",
    price: "5",
    category: "dessert",
    image: "icecream.jpg",
  },
];

// Mock CartContext value
const mockCartContextValue = {
  addToCart: vi.fn(), // Using vi.fn() for mocking functions with Vitest
};

describe("Menu and MenuItem Components", () => {
  beforeAll(() => {
    // Mock the global fetch with Vitest's vi.fn()
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true, // Ensure to mimic a successful response
        json: () => Promise.resolve(mockMenuItems),
      })
    );
  });

  afterAll(() => {
    // Restore the original fetch implementation after all tests
    global.fetch = vi.restoreAllMocks();
  });

  it("displays loading initially and then renders menu items", async () => {
    render(
      <CartContext.Provider value={mockCartContextValue}>
        <Menu />
      </CartContext.Provider>
    );

    // Check for loading indicator
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Wait for menu items to be displayed
    await waitFor(() => {
      expect(screen.getByText("Main Dishes")).toBeInTheDocument();
      expect(screen.getByText("Pizza")).toBeInTheDocument();
      expect(screen.getByText("Desserts")).toBeInTheDocument();
      expect(screen.getByText("Ice Cream")).toBeInTheDocument();
    });
  });
});
