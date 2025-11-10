import express from "express";
import { signup, login } from "../controllers/authController.js";
import User from "../models/User.js"; 
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

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

export default router;
