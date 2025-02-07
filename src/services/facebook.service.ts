import axios from "axios";
import { config } from "../config/env";
import {
  FacebookAuthResponse,
  FacebookAdsInsights,
} from "../types/facebook.types";

export class FacebookService {
  private baseUrl = `https://graph.facebook.com/${config.facebook.graphApiVersion}`;

  async getOAuthUrl(): Promise<string> {
    return `${this.baseUrl}/dialog/oauth?client_id=${config.facebook.appId}&redirect_uri=${config.facebook.redirectUri}&scope=ads_read`;
  }

  async exchangeCodeForToken(code: string): Promise<FacebookAuthResponse> {
    const response = await axios.get(`${this.baseUrl}/oauth/access_token`, {
      params: {
        client_id: config.facebook.appId,
        client_secret: config.facebook.appSecret,
        redirect_uri: config.facebook.redirectUri,
        code,
      },
    });
    return response.data;
  }

  async getAdsInsights(
    accessToken: string,
    adAccountId: string
  ): Promise<FacebookAdsInsights[]> {
    const response = await axios.get(
      `${this.baseUrl}/${adAccountId}/insights`,
      {
        params: {
          access_token: accessToken,
          fields: "impressions,clicks,spend,ctr,date",
          date_preset: "last_30d",
        },
      }
    );
    return response.data.data;
  }
}
