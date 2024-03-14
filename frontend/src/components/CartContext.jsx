import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children, items }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (item) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [item.id]: (prevItems[item.id] || 0) + 1,
    }));

    toast.success("Item added to cart", {
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
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      if (prevItems[itemId] > 1) {
        return { ...prevItems, [itemId]: prevItems[itemId] - 1 };
      }

      const { [itemId]: _, ...rest } = prevItems;
      return rest;
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, items }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
