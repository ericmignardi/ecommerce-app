import { Router } from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { authUser } from "../middleware/auth.js";

const router = Router();

router.post("/list", adminAuth, allOrders);
router.post("/status", adminAuth, updateStatus);

router.post("/place", authUser, placeOrder);
router.post("/stripe", authUser, placeOrderStripe);

router.post("/userOrders", authUser, userOrders);

router.post("/verifyStripe", authUser, verifyStripe);

export default router;
