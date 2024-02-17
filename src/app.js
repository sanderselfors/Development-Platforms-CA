const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { resolve } = require("path");
require("dotenv").config();

const middlewares = require("./middlewares");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database(
  resolve(__dirname, "../bin/pb/pb_data/data.db")
);

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

// Products Routes
app.get("/products", (req, res) => {
  const { id } = req.query;

  if (id) {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      if (err) {
        console.error("Error running sql: " + err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      res.json({
        message: "Product details",
        data: row,
      });
    });
  } else {
    db.all("SELECT * FROM products", (err, rows) => {
      if (err) {
        console.error("Error running sql: " + err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      res.json({
        message: "List of products",
        data: rows,
      });
    });
  }
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error running sql: " + err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    if (!row) {
      res.status(404).json({ message: `Product with ID ${id} not found` });
      return;
    }

    res.json({
      message: "Product details",
      data: row,
    });
  });
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  db.run(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    function cb(err) {
      if (err) {
        console.error(`Error running sql: ${err}`);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      res.json({
        message: `Product added with ID: ${this.lastID}`,
      });
    }
  );
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(`Error running sql: ${err}`);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    res.json({
      message: `Product with ID ${id} deleted`,
    });
  });
});

// Cars Routes
app.get("/cars", (req, res) => {
  const { id } = req.query;

  if (id) {
    db.get("SELECT * FROM cars WHERE id = ?", [id], (err, row) => {
      if (err) {
        console.error("Error running sql: " + err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      res.json({
        message: "Car details",
        data: row,
      });
    });
  } else {
    db.all("SELECT * FROM cars", (err, rows) => {
      if (err) {
        console.error("Error running sql: " + err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      res.json({
        message: "List of cars",
        data: rows,
      });
    });
  }
});

app.get("/cars/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM cars WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error running sql: " + err);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    if (!row) {
      res.status(404).json({ message: `Car with ID ${id} not found` });
      return;
    }

    res.json({
      message: "Car details",
      data: row,
    });
  });
});

app.post("/cars", (req, res) => {
  const { brand } = req.body;

  db.run("INSERT INTO cars (brand) VALUES (?)", [brand], function cb(err) {
    if (err) {
      console.error(`Error running sql: ${err}`);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    res.json({
      message: `Car added with ID: ${this.lastID}`,
    });
  });
});

app.delete("/cars/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM cars WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(`Error running sql: ${err}`);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    res.json({
      message: `Car with ID ${id} deleted`,
    });
  });
});

// Not found and error handling middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
