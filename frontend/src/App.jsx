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
import LoginForm from "./pages/LogInForm";
import SignUpForm from "./pages/SignUpForm";
import AddMenuItemForm from "./components/AddMenuItemForm";
import DeleteMenuItemForm from "./components/DeleteMenuItemForm";
import EditMenuItemForm from "./components/EditMenuItemForm";
import { UserContextProvider } from "./components/UserContext";

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/menuitems")
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
