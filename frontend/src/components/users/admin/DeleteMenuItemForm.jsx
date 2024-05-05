import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import Form from "../../Form";
import { UserContext } from "../UserContext";

const DeleteMenuItemForm = () => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");

  const fields = [
    { name: "id", label: "Menu Item ID", required: true, value: "" },
  ];

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/menuitems/${values.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 404) {
        setError("Menu item with the provided ID does not exist.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }

      console.log("Menu item deleted successfully");
      toast.success("Menu item deleted successfully!", {
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
      console.error("Error deleting menu item:", error);
      toast.error("Failed to delete menu item.");
    }
  };

  return (
    <Form
      fields={fields}
      submitHandler={handleSubmit}
      submitLabel="Delete Menu Item"
      title="Delete Menu Item"
      error={error}
    />
  );
};

export default DeleteMenuItemForm;
