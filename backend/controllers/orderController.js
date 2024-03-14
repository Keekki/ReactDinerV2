const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const db = require("../db/database.js");
const { sendEmail } = require("../email_conf/emailService.js");

const createOrder = async (req, res) => {
  const orderData = req.body.order;

  // Validation and error handling logic
  if (
    orderData === undefined ||
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }
  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer.postalCode === null ||
    orderData.customer.postalCode === undefined ||
    orderData.customer.postalCode.trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }
  // Create a new order with a unique ID
  const newOrder = {
    ...orderData,
    id: uuidv4(),
  };

  // Save the order to the database
  db.run(
    `INSERT INTO orders (id, customer_name, customer_email, customer_street, customer_postalCode, customer_city, items) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      newOrder.id,
      newOrder.customer.name,
      newOrder.customer.email,
      newOrder.customer.street,
      newOrder.customer.postalCode,
      newOrder.customer.city,
      JSON.stringify(newOrder.items),
    ],
    function (err) {
      if (err) {
        console.error("Database operation error:", err.message);
        return res.status(500).json({ message: "Database operation failed." });
      }
      console.log(`Order inserted with rowid ${this.lastID}`);
      res.status(201).json({ message: "Order created!" });
    }
  );

  const emailOptions = {
    from: process.env.EMAIL,
    to: newOrder.customer.email,
    subject: "Order Confirmation",
    text: "Your order has been placed!\n\nALERT! This is a mock message from a throwaway account created\n\nonly to present a functionality in the ReactDine app!!\n\nNOTHING HAS BEEN ORDERED!",
  };

  sendEmail(emailOptions)
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.error("Failed to send email: ", error));
};

module.exports = {
  createOrder,
};
