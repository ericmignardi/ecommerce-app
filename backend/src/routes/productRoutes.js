import { Router } from "express";
import {
  create,
  read,
  readById,
  deleteById,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = Router();

router.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  create
);
router.post("/remove", adminAuth, deleteById);
router.post("/single", readById);
router.get("/list", read);

export default router;
