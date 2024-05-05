import React from "react";

const AboutUs = () => {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "83.7vh",
    width: "auto",
    backgroundColor: "black",
    color: "white",
    fontFamily: "Garamond",
    padding: "0 20px",
    boxSizing: "border-box",
    textAlign: "center",
  };

  const headerStyle = {
    color: "orange",
    marginBottom: "20px",
  };

  const textStyle = {
    width: "700px",
    fontSize: "1.5rem",
  };

  const footerStyle = {
    marginTop: "20px",
  };

  const spanStyle = { color: "orange" };

  return (
    <div style={style}>
      <h1 style={headerStyle}>About the React Dine</h1>
      <p style={textStyle}>
        This is a web development project presenting a website for a restaurant.
        The page is made with React with a Node backend. You can test out the
        functionality of the page by placing an order, you should get a
        confirmation email of the order to your email from
        frimonreactdine@gmail.com if you input your email when ordering. The app
        is deployed using Microsoft Azure.
      </p>
      <p style={footerStyle}>
        <span style={spanStyle}>Made by</span> Matias Frimodig
      </p>
    </div>
  );
};

export default AboutUs;
