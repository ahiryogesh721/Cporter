import { Router } from "express";
import {
  facebookAdAccounts,
  facebookAdData,
} from "../controllers/facebook.Controller";

const router = Router();

router.get("/ad-accounts", facebookAdAccounts);
router.get("/ad-data", facebookAdData);

export default router;
