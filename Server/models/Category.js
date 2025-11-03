import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    unique: true,
  },
  name: { type: String, required: true },
  image: String,
});


categorySchema.pre("save", async function (next) {
  if (!this.categoryId) {
    const Category = mongoose.model("Category", categorySchema);
    const count = await Category.countDocuments();
    const newId = "CAT" + String(count + 1).padStart(3, "0");
    this.categoryId = newId;
  }
  next();
});

export default mongoose.model("Category", categorySchema);
