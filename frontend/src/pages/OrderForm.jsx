import React, { useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import CartContext from "../components/CartContext";
import { UserContext } from "../components/UserContext";

const OrderForm = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:5000/api/users/details/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched user details:", data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
            street: data.street || "",
            postalCode: data.postalCode || "",
            city: data.city || "",
          });
          console.log("Updated name state:", data.name);
        })
        .catch((error) =>
          console.error("Failed to fetch user details:", error)
        );
    }
  }, [user]);

  const fields = [
    { name: "name", label: "Name", required: true, value: formData.name },
    { name: "email", label: "Email", required: true, value: formData.email },
    { name: "street", label: "Street", required: true, value: formData.street },
    {
      name: "postalCode",
      label: "Postal Code",
      required: true,
      value: formData.postalCode,
    },
    { name: "city", label: "City", required: true, value: formData.city },
  ];

  console.log("fields: ", fields);

  const handleOrderSubmit = (values) => {
    const orderData = {
      customer: values,
      items: Object.keys(cartItems).map((itemId) => ({
        id: itemId,
        quantity: cartItems[itemId],
      })),
    };
    navigate("/confirm-order", { state: { order: orderData } });
  };

  return (
    <Form
      fields={fields}
      submitHandler={handleOrderSubmit}
      submitLabel="Proceed to Confirmation"
      title="Customer Info"
    />
  );
};

export default OrderForm;
