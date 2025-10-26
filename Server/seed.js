import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Admin } from "./models/Admin.js";

dotenv.config();

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const adminCount = await Admin.countDocuments();
    console.log("Existing admin count:", adminCount);

    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash("adminpassword", 10);
      await Admin.create({
        username: "admin",
        password: hashedPassword
      });
      console.log("account created");
    } else {
      console.log("account already existed");
    }

    mongoose.connection.close();
  } catch (err) {
    console.log("Error:", err);
  }
};

Connection();
