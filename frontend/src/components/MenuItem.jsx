import React, { useContext } from "react";
import CartContext from "./CartContext.jsx";
import "../styling/MenuItem.css";

const MenuItem = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(item);
  };

  return (
    <div className="menu-item">
      <img
        src={`https://reactdinebackend.onrender.com/${item.image}`}
        alt={item.name}
      />
      <h2>{item.name}</h2>
      <p className="item-description">{item.description}</p>
      <p className="item-price">${item.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default MenuItem;
