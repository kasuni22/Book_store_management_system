import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  ISBN: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  author: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: Number,
  quantity: Number,
  image: String
});

export default mongoose.model("Book", bookSchema);
