import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartContext } from "./CartContext";
import Cart from "./Cart";
import { BrowserRouter as Router } from "react-router-dom";

const mockItems = [
  { id: 1, name: "Pizza", price: 10 },
  { id: 2, name: "Ice Cream", price: 5 },
];

// Mock the entire CartContext for testing
const mockCartContext = (cartItems) => ({
  cartItems,
  removeFromCart: vi.fn(),
  items: mockItems,
});

describe("Cart Component", () => {
  const setup = (contextValue) => {
    render(
      <Router>
        <CartContext.Provider value={contextValue}>
          <Cart closeCart={() => {}} />
        </CartContext.Provider>
      </Router>
    );
  };

  it("should display items in the cart", () => {
    setup(mockCartContext({ 1: 2, 2: 1 }));

    // Use regex for flexible matching
    expect(screen.getByText(/Pizza/)).toBeInTheDocument();
    expect(screen.getByText(/Ice Cream/)).toBeInTheDocument();

    // Check total price
    const totalPrice = 2 * mockItems[0].price + 1 * mockItems[1].price;
    expect(
      screen.getByText(`Total: $${totalPrice.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("should display empty cart message when no items are in the cart", () => {
    setup(mockCartContext({}));
    expect(
      screen.getByText(/Your cart appears to be empty ☹/i)
    ).toBeInTheDocument();
  });
});
