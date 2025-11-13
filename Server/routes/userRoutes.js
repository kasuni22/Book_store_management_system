import express from "express";
import { signup, login, getProfile, updateProfile } from "../controllers/authController.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);

router.get("/", async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err.message);
    res.status(500).json({ message: "Server error fetching students" });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ message: "Server error fetching user" });
  }
});

router.put("/:email", async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;

    const updateData = { firstName, lastName };

    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      updateData,
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error updating profile" });
  }
});

export default router;
