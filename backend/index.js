const express = require("express");
const app = express();
const { Book } = require("./models/booksRecord.js");
const mongoose = require("mongoose");
const cors=require("cors");

mongoose
  .connect("mongodb://0.0.0.0:27017/Fin-tracker")
  .then(() => console.log("Connected to MongoDB..."));
  
//save new book
app.use(express.json());
app.use(cors()) 

app.post("/books", async (req, resp) => {
  try {
    console.log("Received data:", req.body); // Log incoming data

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publisherYear: req.body.publisherYear,
      content:req.body.content,
    };

    const saveBook = await Book.create(newBook);
    return resp.status(200).send(saveBook);
  } catch (error) {
    console.error("Error creating new book:", error); // Log the complete error
    return resp.status(500).send({ message: "Error creating new book", error: error.message });
  }
});


app.get("/books", async (req, resp) => {
  const books = await Book.find();
  resp.send(books);
});

app.get("/books/:id", async (req, resp) => {
  const { id } = req.params;
  const books = await Book.findById(id);
  return resp.send(books);
});

app.put("/books/:id", async (req, resp) => {
  const { id } = req.params;
  const books = await Book.findByIdAndUpdate(id, req.body);
  return resp.send(books);
});

app.delete("/books/:id", async (req, resp) => {
  const { id } = req.params;
  const books = await Book.findByIdAndDelete(id);
  return resp.send(books);
});
app.listen(5000, () => {
  console.log("connected....");
});
