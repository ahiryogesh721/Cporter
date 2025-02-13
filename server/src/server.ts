// import { PrismaClient } from '@prisma/client';
// import app from './app';

// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3000


// const startServers = async () => {
//     try {
//         await prisma.$connect();
//         console.log('database connected');
//         app.listen(PORT, () => { console.log(`server running on port ${PORT}`) });
//     } catch (err) {
//         console.error('Error starting servers:', err);
//     }
// }
// startServers();


import express from "express";
import dotenv from "dotenv";
import passport from "./config/passport";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
