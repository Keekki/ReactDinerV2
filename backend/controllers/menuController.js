const db = require("../db/database.js");

// Get all menu items
exports.getAllMenuItems = (req, res) => {
  db.all("SELECT * FROM menu_items", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(200).json(rows);
  });
};

// Create a new menu item
exports.createMenuItem = (req, res) => {
  const sql = `INSERT INTO menu_items(name, price, description, image) VALUES(?,?,?,?)`;
  const params = [
    req.body.name,
    req.body.price,
    req.body.description,
    req.body.image,
  ];
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
    });
  });
};

// Update a menu item
exports.updateMenuItem = (req, res) => {
  // Check if the menu item exists
  db.get(
    "SELECT * FROM menu_items WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // If the menu item doesn't exist, return a 404 status code
      if (!row) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      // Update the menu item
      const sql = `UPDATE menu_items SET name = ?, price = ?, description = ?, image = ? WHERE id = ?`;
      const params = [
        req.body.name,
        req.body.price,
        req.body.description,
        req.body.image,
        req.params.id,
      ];

      db.run(sql, params, function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: "Menu item updated" });
      });
    }
  );
};

// Delete a menu item
exports.deleteMenuItem = (req, res) => {
  db.run(`DELETE FROM menu_items WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: "Menu item deleted" });
  });
};
