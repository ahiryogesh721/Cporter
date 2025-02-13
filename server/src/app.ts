import axios from 'axios';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from "express";
dotenv.config();
const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());

const FACEBOOK_ACCESS_TOKEN = 'EAAHe4nZB0ia8BO8rbCUBEvgNh5qc4G6Jxh83PDGDtTNYMu8y8NZB5RRujGS3ShDo1ZB2YSuOKCPPI9FcZAyTyr5xo3jILKfITIAuJepUTCy7GIyPlwFLIZBphAmpUTSPNdbbtEWEfkwO2gCyY6rR0ndkyd1LZA7TPbnOR1Ydr8gVdFGzWIxK2uMI2CzZBVJkF6clPWGaa1UV4eJ1SC8rvs4CrEUCcU7lFZCKuodeMiowmgZDZD';
const PAGE_ID = '633923042452743';

app.get("/api/facebook-data", async (req, res) => {
    try {
        console.log('here')
        const response = await axios.get(
            `https://graph.facebook.com/v22.0/${PAGE_ID}/insights?metric=page_impressions,page_engaged_users&access_token=${FACEBOOK_ACCESS_TOKEN}`
        );
        res.json(response.data);
        console.log('response.data');
        console.log(response.data);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: (error as any)?.response?.data });
    }
});

export default app