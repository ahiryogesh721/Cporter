import { Router } from "express";
import { FacebookController } from "../controllers/facebook.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();
const facebookController = new FacebookController();

router.get(
  "/insights/:adAccountId",
  authenticateToken,
  facebookController.getAdsInsights
);

export default router;
