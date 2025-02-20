import { Router } from "express";
import { redieact, OAuthCallback } from "../controllers/auth.Controller";

const router = Router();

router.get("/facebook-auth", redieact);
router.get("/facebook-callback", OAuthCallback);

export default router;
