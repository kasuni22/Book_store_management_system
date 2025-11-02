import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import createDefaultAdmin from "./utils/createAdmin.js";

import bookRoutes from "./routes/bookRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";   

dotenv.config();
connectDB();
createDefaultAdmin(); 


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
