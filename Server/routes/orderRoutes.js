import express from "express";
import Order from "../models/Order.js";
import Book from "../models/Book.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userEmail, bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (!book.inStock || book.quantity <= 0) {
      return res.status(400).json({ message: "Book is out of stock" });
    }

    const order = new Order({
      userEmail,
      bookName: book.title,
      bookPrice: book.price,
    });

    await order.save();

    book.quantity -= 1;
    if (book.quantity <= 0) {
      book.inStock = false;
    }
    await book.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error placing order" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
