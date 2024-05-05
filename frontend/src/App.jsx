import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Menu from "./components/menu/Menu";
import Cart from "./components/cart/Cart";
import AboutUs from "./pages/AboutUs";
import { CartProvider } from "./components/cart/CartContext";
import OrderForm from "./pages/OrderForm";
import ConfirmOrder from "./pages/ConfirmOrder";
import LoginForm from "./components/users/LoginForm";
import SignUpForm from "./components/users/SignUpForm";
import AddMenuItemForm from "./components/users/admin/AddMenuItemForm";
import DeleteMenuItemForm from "./components/users/admin/DeleteMenuItemForm";
import EditMenuItemForm from "./components/users/admin/EditMenuItemForm";
import { UserContextProvider } from "./components/users/UserContext";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/menuitems`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <UserContextProvider>
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
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/add-menu-item" element={<AddMenuItemForm />} />
            <Route path="/delete-menu-item" element={<DeleteMenuItemForm />} />
            <Route path="/edit-menu-item" element={<EditMenuItemForm />} />
          </Routes>
          <Toaster position="top-center" reverseOrder={false} />
        </Router>
      </CartProvider>
    </UserContextProvider>
  );
};

export default App;
