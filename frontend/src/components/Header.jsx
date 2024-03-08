import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import Cart from "./Cart";
import "../styling/Header.css";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isCartOpen, setCartOpen] = useState(false);

  const closeCart = () => setCartOpen(false);

  return (
    <header className={`header ${isHomePage ? "homepage" : "other"}`}>
      <Link to="/" className="logo-link">
        <div className="logo">React Dine</div>
      </Link>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link
              to="/cart"
              onClick={(e) => {
                e.preventDefault();
                setCartOpen(true);
              }}
            >
              Cart
            </Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li className="login-li">
            <Link to="/login" className="login-link">
              Log In
              <FontAwesomeIcon icon={faRightToBracket} className="login-icon" />
            </Link>
          </li>
        </ul>
      </nav>
      {isCartOpen && <Cart closeCart={closeCart} />}
    </header>
  );
};

export default Header;
