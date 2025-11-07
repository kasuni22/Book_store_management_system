import express from "express";
import Book from "../models/Book.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    if (!req.body.isbn || req.body.isbn.trim() === "") {
      return res.status(400).json({ message: "ISBN is required!" });
    }

    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "ISBN already exists!" });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});


router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
});


router.get("/category/:category", async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch category books" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch book details" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "ISBN already exists!" });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete book" });
  }
});

export default router;
