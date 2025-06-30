import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDb } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .then((err) => {
    console.error(err.message);
    process.exit(1);
  });
