import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import Form from "../../Form";
import { UserContext } from "../UserContext";

const AddMenuItemForm = () => {
  const { user } = useContext(UserContext);

  // Initial state for the form fields
  const fields = [
    { name: "name", label: "Name", required: true, value: "" },
    { name: "price", label: "Price", required: true, value: "" },
    { name: "description", label: "Description", required: true, value: "" },
    { name: "image", label: "Image URL", required: true, value: "" },
    {
      name: "category",
      label: "Category (main or dessert)",
      required: true,
      value: "",
    },
  ];

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/menuitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Use the token from UserContext
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add new menu item");
      }

      const data = await response.json();
      console.log("Menu item added successfully:", data);
      toast.success("A new menu item added successfully!", {
        style: {
          border: "1px solid orange",
          padding: "16px",
          color: "white",
          background: "black",
        },
        iconTheme: {
          primary: "orange",
          secondary: "black",
        },
      });
    } catch (error) {
      console.error("Error adding new menu item:", error);
      toast.error("Failed to add new menu item.");
    }
  };

  return (
    <Form
      fields={fields}
      submitHandler={handleSubmit}
      submitLabel="Add Menu Item"
      title="Add Menu Item"
    />
  );
};

export default AddMenuItemForm;
