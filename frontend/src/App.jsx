import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Menu from "./pages/Menu";
import Cart from "./components/Cart";
import AboutUs from "./pages/AboutUs";
import { CartProvider } from "./components/CartContext";
import OrderForm from "./pages/OrderForm";
import ConfirmOrder from "./pages/ConfirmOrder";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://reactdinebackend.onrender.com/api/dishes")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <CartProvider items={items}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/confirm-order" element={<ConfirmOrder />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </Router>
    </CartProvider>
  );
};

export default App;
