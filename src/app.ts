import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import facebookRoutes from "./routes/facebook.routes";
import { connectDB } from "./config/db";

const app = express();

//connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/facebook", facebookRoutes);

export default app;
