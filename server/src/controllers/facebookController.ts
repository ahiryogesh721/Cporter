import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID!;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET!;
const FACEBOOK_REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI!;
/**
 * Redirect user to Facebook login
 */
export const facebookLogin = async (req: Request, res: Response) => {
  const fbLoginUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}`
  res.redirect(fbLoginUrl);
};
/**
 * Facebook OAuth Callback
 */
export const facebookCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    const tokenResponse = await axios.get(`https://graph.facebook.com/v19.0/oauth/access_token`, {
      params: {
        client_id: FACEBOOK_APP_ID,
        client_secret: FACEBOOK_APP_SECRET,
        redirect_uri: FACEBOOK_REDIRECT_URI,
        code,
      },
    });
    const accessToken = tokenResponse.data.access_token;
    // Fetch User Details (Optional)
    const userInfo = await axios.get("https://graph.facebook.com/me", {
      params: { access_token: accessToken, fields: "id,name,email" },
    });
    res.json({
      message: "Facebook Auth Successful",
      user: userInfo.data,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate with Facebook" });
  }
};