import { Request, Response } from "express";
import { FacebookService } from "../services/facebook.service";

const facebookService = new FacebookService();

export class FacebookController {
  async getAdsInsights(req: Request, res: Response) {
    try {
      const { adAccountId } = req.params;
      const { facebookToken } = req.user;

      if (!facebookToken) {
        return res.status(401).json({ error: "Facebook token required" });
      }

      const insights = await facebookService.getAdsInsights(
        facebookToken,
        adAccountId
      );
      res.json(insights);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Facebook Ads insights" });
    }
  }
}
