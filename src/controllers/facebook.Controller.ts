import axios from "axios";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export async function facebookAdAccounts(req: any, res: any) {
  const { sessionKey } = req.query;
  if (!sessionKey) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(sessionKey, config.jwt.secret);

    const access_token =
      typeof decoded === "string" ? decoded : decoded.access_token;

    const response = await axios.get(
      `https://graph.facebook.com/v19.0/me/adaccounts?fields=id,name,account_status&access_token=${access_token}`
    );

    console.log("response::", response);

    const data = await response.data;

    console.log("data::", data);

    /* ori */
    res.json(data);
  } catch (error) {
    /* temp */
    //console.error("Error fetching Ad accounts:", error);
    //res.status(500).json({ error: "Failed to fetch Ad accounts" });
  } finally {
    res.json(
      JSON.stringify([
        { id: 1, name: "bob1" },
        { id: 2, name: "bob2" },
      ])
    );
  }
}

export async function facebookAdData(req: any, res: any) {
  const { sessionKey, adAccountId, startDate, endDate } = req.query;
  if (!sessionKey || !adAccountId)
    return res.status(400).json({ error: "Missing parameters" });

  try {
    const decode = jwt?.verify(sessionKey, config.jwt.secret);
    const access_token =
      typeof decode === "string" ? decode : decode.access_token;

    const response = await axios.get(
      `https://graph.facebook.com/v19.0/${adAccountId}/insights?fields=campaign_name,clicks,impressions,spend&time_range={'since':'${startDate}','until':'${endDate}'}&access_token=${access_token}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Facebook Ads data:", error);
    res.status(500).json({ error: "Failed to fetch ads data" });
  }
}
