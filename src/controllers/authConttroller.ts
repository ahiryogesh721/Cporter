import axios from "axios";
import { config } from "../config/env";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const redieact = async (req: any, res: any) => {
  const facebookOAuthURL = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${config.facebook.appId}&redirect_uri=${config.facebook.redirectUri}&scope=email,public_profile`;
  res.redirect(facebookOAuthURL);
};

export const OAuthCallback = async (req: any, res: any) => {
  try {
    const { code } = req.query;
    if (!code)
      return res.status(400).json({ error: "Authorization code missing" });

    // Exchange the code for an access token
    const tokenResponse = await axios.get(
      "https://graph.facebook.com/v19.0/oauth/access_token",
      {
        params: {
          client_id: process.env.FACEBOOK_APP_ID,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
          code,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch user profile data from Facebook
    const profileResponse = await axios.get("https://graph.facebook.com/me", {
      params: {
        fields: "id,name,email,picture",
        access_token: accessToken,
      },
    });

    const { id, name, email, picture } = profileResponse.data;

    // Check if user already exists in DB
    let user = await User.findOne({ facebookId: id });

    if (!user) {
      user = new User({
        facebookId: id,
        name,
        email,
        profilePicture: picture?.data?.url,
      });
      await user.save();
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Facebook Login Error:", error);
    res.status(500).json({ error: "Facebook authentication failed" });
  }
};
