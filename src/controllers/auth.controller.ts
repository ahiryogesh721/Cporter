import { Request, Response } from "express";
import { FacebookService } from "../services/facebook.service";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

const facebookService = new FacebookService();

export class AuthController {
  async getFacebookAuthUrl(req: Request, res: Response) {
    try {
      const url = await facebookService.getOAuthUrl();
      res.json({ url });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate Facebook auth URL" });
    }
  }

  async handleFacebookCallback(req: Request, res: Response) {
    try {
      const { code } = req.query;
      if (!code || typeof code !== "string") {
        return res.status(400).json({ error: "Authorization code required" });
      }

      const tokenData = await facebookService.exchangeCodeForToken(code);

      // Generate JWT
      const token = jwt.sign(
        { facebookToken: tokenData.access_token },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Facebook authentication failed" });
    }
  }
}
