import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import facebookRoutes from "./routes/facebook.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/facebook", facebookRoutes);

export default app;
