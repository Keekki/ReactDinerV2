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
});

module.exports = db;
