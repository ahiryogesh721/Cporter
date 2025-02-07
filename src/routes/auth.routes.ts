import { Router } from "express";
import { redieact, OAuthCallback } from "../controllers/authConttroller";

const router = Router();

router.get("/facebook", redieact);
router.get("/facebook/callback", OAuthCallback);

export default router;
