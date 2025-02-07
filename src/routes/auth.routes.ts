import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.get("/facebook/url", authController.getFacebookAuthUrl);
router.get("/facebook/callback", authController.handleFacebookCallback);

export default router;
