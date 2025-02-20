import axios from "axios";
import { config } from "../config/env";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export async function redieact(req: any, res: any) {
  const facebookOAuthURL = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${config.facebook.appId}&redirect_uri=${config.facebook.redirectUri}&scope=email,public_profile`;

  res.redirect(facebookOAuthURL);
}

export async function OAuthCallback(req: any, res: any) {
  try {
    const { code } = req.query;

    if (!code)
      return res.status(400).json({ error: "Authorization code missing" });

    // Exchange the code for an access token
    const tokenResponse = await axios.get(
      "https://graph.facebook.com/v19.0/oauth/access_token",
      {
        params: {
          client_id: config.facebook.appId,
          client_secret: config.facebook.appSecret,
          redirect_uri: config.facebook.redirectUri,
          code,
        },
      }
    );

    const access_token = tokenResponse.data.access_token;

    // Fetch user profile data from Facebook
    const profileResponse = await axios.get("https://graph.facebook.com/me", {
      params: {
        fields: "id,name,email",
        access_token,
      },
    });

    const { id, name, email, picture } = profileResponse.data;

    /* 
    // Check if user already exists in DB
    let user = await User.findOne({ facebookId: id });
    console.log(user);

    if (!user) {
      user = new User({
        facebookId: id,
        name,
        email,
        profilePicture: picture?.data?.url,
      });
      await user.save();
    } */

    const sessionKey = jwt.sign({ access_token }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.redirect(`${config.frontend_url}/auth/O?sessionKey=${sessionKey}`);
  } catch (error) {
    console.error("OAuth Error:", error);
    res.status(500).json({ error: "OAuth failed" });
  }
}
