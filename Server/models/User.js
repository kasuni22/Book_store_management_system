import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" }
});

export default mongoose.model("User", userSchema);
