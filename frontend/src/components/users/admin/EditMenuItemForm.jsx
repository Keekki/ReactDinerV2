import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import Form from "../../Form";
import { UserContext } from "../UserContext";

const EditMenuItemForm = () => {
  const { user } = useContext(UserContext);
  const [menuItemId, setMenuItemId] = useState("");
  const [menuItem, setMenuItem] = useState(null);
  const [error, setError] = useState("");

  const handleIdSubmit = async (values) => {
    try {
      const menuItemId = parseInt(values.id, 10);
      const response = await fetch(
        `http://localhost:5000/api/menuitems/${menuItemId}`,
        {
          method: "GET",
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMenuItem(data);
      setMenuItemId(menuItemId);
    } catch (error) {
      console.error("Error fetching menu item:", error);
      toast.error("Failed to fetch menu item.");
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/menuitems/${menuItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update menu item");
      }

      console.log("Menu item updated successfully");
      toast.success("Menu item updated successfully!", {
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
      console.error("Error updating menu item:", error);
      toast.error("Failed to update menu item.");
    }
  };

  const idField = [
    { name: "id", label: "Menu Item ID", required: true, value: "" },
  ];

  const editFields = [
    {
      name: "name",
      label: "Name",
      required: true,
      value: menuItem?.name || "",
    },
    {
      name: "price",
      label: "Price",
      required: true,
      value: menuItem?.price || "",
    },
    {
      name: "description",
      label: "Description",
      required: true,
      value: menuItem?.description || "",
    },
    {
      name: "image",
      label: "Image URL",
      required: true,
      value: menuItem?.image || "",
    },
    {
      name: "category",
      label: "Category (main or dessert)",
      required: true,
      value: menuItem?.category || "",
    },
  ];

  return (
    <div>
      {!menuItem && (
        <Form
          fields={idField}
          submitHandler={handleIdSubmit}
          submitLabel="Fetch Menu Item"
          title="Edit Menu Item"
          error={error}
        />
      )}
      {menuItem && (
        <Form
          fields={editFields}
          submitHandler={handleEditSubmit}
          submitLabel="Update Menu Item"
          title="Edit Menu Item"
        />
      )}
    </div>
  );
};

export default EditMenuItemForm;
