import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    redirectUri: process.env.FACEBOOK_REDIRECT_URI,
    graphApiVersion: "v19.0",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "KEY",
    expiresIn: "1h",
  },
  mongo: {
    url: process.env.MONGO_URI,
  },
  frontend_url: process.env.FRONTRND_URL || "URL",
};
