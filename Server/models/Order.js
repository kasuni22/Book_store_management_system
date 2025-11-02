import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  bookName: String,
  bookPrice: Number,
  orderDate: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
