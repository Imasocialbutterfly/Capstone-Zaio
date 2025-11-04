import express from "express";
import { signup, login, getProfile, becomeHost } from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get('/profile', authenticate, getProfile);
router.put('/become-host', authenticate, becomeHost)

export default router;