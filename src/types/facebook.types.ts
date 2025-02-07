export interface FacebookAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface FacebookAdsInsights {
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  date: string;
}
