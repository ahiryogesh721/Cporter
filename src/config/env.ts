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
  looker: {
    apiKey: process.env.LOOKER_API_KEY,
    apiEndpoint: process.env.LOOKER_API_ENDPOINT,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: "24h",
  },
};
