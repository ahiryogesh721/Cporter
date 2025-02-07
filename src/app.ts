import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./config/db";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
