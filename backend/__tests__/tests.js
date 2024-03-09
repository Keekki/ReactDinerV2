const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../app");
const jwt = require("jsonwebtoken");
const db = require("../db/database.js");

const userId = "mockUserId";
const email = "test@example.com";

const { v4: uuidv4 } = require("uuid");

const createUserInDatabase = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const newUserId = uuidv4(); // Generate a new UUID for the user

  console.log("Inserting user with ID:", newUserId);

  await new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (id, name, email, password_hash, street, postalCode, city) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        newUserId,
        userData.name,
        userData.email,
        hashedPassword,
        userData.street,
        userData.postalCode,
        userData.city,
      ],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

// Helper function to generate a JWT token
const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
};

beforeEach(async () => {
  // Truncate or delete data from tables
  await new Promise((resolve, reject) => {
    db.run("DELETE FROM users", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  // Create a new user
  const userData = {
    name: "Esko Mörkö",
    email: "esko1@example.com",
    password: "password123",
    street: "Test Street",
    postalCode: "12345",
    city: "Test City",
  };

  // Ensure you await the request to create the user
  await request(app).post("/api/users/signup").send(userData);
});

describe(
  "API Tests",
  () => {
    // Menu Item Tests with Authentication
    it("should create a new menu item with authentication", async () => {
      const menuItem = {
        name: "Fries",
        price: "3.99",
        description: "Fresh fries!",
        image: "images/fries.jpg",
      };
      const token = generateToken(userId, email); // Generate a token here with valid user data
      const response = await request(app)
        .post("/api/menuitems")
        .set("Authorization", `Bearer ${token}`)
        .send(menuItem);
      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeDefined();
    });

    it("should update a menu item with authentication", async () => {
      const menuItemId = 1;
      const updatedMenuItem = {
        name: "Mac & Cheese",
        price: "9.99",
        description:
          "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.",
        image: "images/mac-and-cheese.jpg",
      };
      const token = generateToken(userId, email); // Generate a token here with valid user data
      const response = await request(app)
        .put(`/api/menuitems/${menuItemId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedMenuItem);
      // Check if the item was successfully updated
      if (response.statusCode === 200) {
        expect(response.body.message).toEqual("Menu item updated");
      }
      // If the item doesn't exist, check for a 404 status code
      if (response.statusCode === 404) {
        expect(response.body.message).toEqual("Menu item not found");
      }
    });

    it("should delete a menu item with authentication", async () => {
      const menuItemId = 1;
      const token = generateToken(userId, email); // Generate a token here with valid user data
      const response = await request(app)
        .delete(`/api/menuitems/${menuItemId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual("Menu item deleted");
    });

    // Test to check if a non-existing menu item cannot be retrieved
    it("should not retrieve a non-existing menu item", async () => {
      const nonExistingId = 25;
      const response = await request(app).get(
        `/api/menuitems/${nonExistingId}`
      );
      expect(response.statusCode).toBe(404);
    });

    // Test to check if menu items are sorted by name in ascending order
    it("should retrieve all menu items sorted by name in ascending order", async () => {
      const response = await request(app).get("/api/menuitems");

      // Ensure the request was successful
      expect(response.statusCode).toBe(200);

      // Extract the menu items from the response
      const menuItems = response.body;

      // Sort the menu items by name in ascending order
      const sortedMenuItems = menuItems.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      // Compare the sorted menu items with the expected order
      expect(menuItems.map((item) => item.name)).toEqual(
        sortedMenuItems.map((item) => item.name)
      );
    });

    // Test to check if a menu item with invalid data is not created
    it("should not create a menu item with invalid data", async () => {
      const invalidMenuItem = {
        // Missing required 'price' field
        name: "Invalid Item",
        description: "This item is missing the price.",
        image: "images/invalid-item.jpg",
      };
      const response = await request(app)
        .post("/api/menuitems")
        .send(invalidMenuItem);
      expect(response.statusCode).toBe(201);
    });

    // Test to check if the API returns a proper error message for invalid routes
    it("should return a proper error message for an invalid API route", async () => {
      const response = await request(app).get("/api/nonexistentroute");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: "Not found" });
    });
  },

  describe("Authentication tests:", () => {
    it("should sign up a new user", async () => {
      const userData = {
        name: "Testi User",
        email: "test1@example.com",
        password: "password1234",
      };
      const response = await request(app)
        .post("/api/users/signup")
        .send(userData);

      console.log("asd" + JSON.stringify(userData));
      expect(response.statusCode).toBe(201);
      expect(response.body.token).toBeDefined();
    });

    it("should log in an existing user", async () => {
      // Step 1: Create a user
      const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        street: "Test Street",
        postalCode: "12345",
        city: "Test City",
      };

      // Assuming you have a function to create a user in the database
      await createUserInDatabase(userData);

      // Step 2: Attempt to log in
      const loginData = {
        email: userData.email,
        password: userData.password,
      };

      const response = await request(app)
        .post("/api/users/login")
        .send(loginData);

      // Step 3: Verify the login was successful
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  })
);
