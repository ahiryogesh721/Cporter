import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from "express";
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());

export default app