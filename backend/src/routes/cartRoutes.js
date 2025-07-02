import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartController.js";
import { Router } from "express";
import { authUser } from "../middleware/auth.js";

const router = Router();

router.post("/get", authUser, getUserCart);
router.post("/add", authUser, addToCart);
router.post("/update", authUser, updateCart);

export default router;
