import express from "express";
import { connection, getDB } from "./db.js";
import { ObjectId } from "mongodb";

// init app & middleware
const app = express();

// connect to db & start server
let db;
connection((err) => {
  if (err) {
    console.log("Error: ", err);
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
  let books = [];
  db.collection("books")
    .find()
    .sort({ rating: -1 })
    .forEach((book) => {
      // cursor method to iterate through the results
      books.push(book);
    })
    .then(() => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error fetching books" });
    });

  //   res.json({ message: "Books route" });
});

app.get("/books/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  let id = new ObjectId(req.params.id);
  db.collection("books")
    .findOne({ _id: id })
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
      }
      res.status(200).json(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error fetching book" });
    });
});
