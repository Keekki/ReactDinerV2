const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database("./db/react_diner.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the react_diner database.");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    description TEXT,
    image TEXT,
    category TEXT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Table created successfully.");
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password_hash VARCHAR(60) NOT NULL,
    street VARCHAR(60),
    postalCode VARCHAR(10),
    city VARCHAR(30),
    admin BOOLEAN NOT NULL DEFAULT 0, -- 0 for false, 1 for true
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
  )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Users table created successfully.");
      }
    }
  );

  const adminEmail = "matias.frimodig@tuni.fi";

  db.run(
    `UPDATE users SET admin = 1 WHERE email = ?`,
    [adminEmail],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS orders (
       id VARCHAR(36) NOT NULL,
       customer_name VARCHAR(100) NOT NULL,
       customer_email VARCHAR(50) NOT NULL,
       customer_street VARCHAR(60) NOT NULL,
       customer_postalCode VARCHAR(10) NOT NULL,
       customer_city VARCHAR(30) NOT NULL,
       items TEXT NOT NULL,
       created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       PRIMARY KEY(id)
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Orders table created successfully.");
      }
    }
  );

  // Check if the menu_items table is empty
  db.get("SELECT COUNT(*) AS count FROM menu_items", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (row.count === 0) {
      console.log("The menu_items table is empty. Inserting data.");

      // The table is empty, proceed to insert data from init.sql
      fs.readFile("./db/init.sql", "utf8", (err, data) => {
        if (err) {
          console.error(err.message);
          return;
        }
        db.exec(data, (err) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log("Data inserted successfully.");
          }
        });
      });
    } else {
      console.log(
        "The menu_items table already has data. No data was inserted."
      );
    }
  });
});

module.exports = db;
