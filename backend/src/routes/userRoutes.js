import { Router } from "express";
import { login, register, adminLogin } from "../controllers/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin", adminLogin);

export default router;
