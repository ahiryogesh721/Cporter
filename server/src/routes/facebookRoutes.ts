import { Router } from "express";
import { facebookCallback, facebookLogin } from "../controllers/facebookController";

const router = Router();

router.get("/facebook", facebookLogin);
router.get("/facebook/callback", facebookCallback);

export default router;