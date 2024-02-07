/* eslint-disable quotes */
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { resolve } = require("path");

require("dotenv").config();

const middlewares = require("./middlewares");

const db = new sqlite3.Database(
  resolve(__dirname, "../bin/pb/pb_data/data.db")
);

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.get("/products", (req, res) => {
  // We need to run a sql query against our pocketbase DB to get all the products
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.log("Error running sql: " + err);

      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    }

    res.json({
      message: "list of products",
      data: rows,
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
        console.log(`Error running sql: ${err}`);

        res.status(500);
        res.json({
          message: "Internal Server Error",
        });
      }

      res.json({
        message: `product ${this.lastID} added`,
      });
    }
  );
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
