import express from "express";
import { connection, getDB } from "./db.js";

// init app & middleware
const app = express();

// connect to db & start server
let db;
connection((err) => {
  if (err) {
    console.log("Error", err);
    return;
  }
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  db = getDB();
  console.log("Successfully connected to database");
});

// route requests
app.get("/books", (req, res) => {
  res.json({ message: "Books route" });
});
