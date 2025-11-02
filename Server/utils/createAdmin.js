import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); 

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (!existingAdmin) {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        console.warn("Admin credentials missing in .env file. Skipping admin creation.");
        return;
      }

      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      const adminUser = new User({
        firstName: "Admin",
        lastName: "User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("Default admin account created successfully!");
      console.log(`Email: ${adminEmail}`);
    } else {
      console.log("Admin account already exists.");
    }
  } catch (err) {
    console.error("Error creating default admin:", err);
  }
};

export default createDefaultAdmin;
