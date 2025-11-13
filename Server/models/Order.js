import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  bookName: String,
  bookPrice: Number,
  quantity: { type: Number, default: 1 },
  orderDate: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
