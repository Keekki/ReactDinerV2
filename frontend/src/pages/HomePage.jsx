import React from "react";
import { Link } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import "../styling/HomePage.css";

const HomePage = () => {
  return (
    <div className="home">
      <BackgroundVideo />
      <div className="container">
        <h1>Welcome to Our Authentic React Restaurant!</h1>
      </div>
      <Link to="/menu" className="menu-button">
        Check Menu
      </Link>
    </div>
  );
};

export default HomePage;
