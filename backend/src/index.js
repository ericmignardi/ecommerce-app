import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb } from "./lib/db.js";
import { connectCloudinary } from "./lib/cloudinary.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDb();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
