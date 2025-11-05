import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: String,
  year: Number,
  price: Number,
  category: { type: String, required: true },
  coverImage: String,
  quantity: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true }
});

export default mongoose.model("Book", bookSchema);
