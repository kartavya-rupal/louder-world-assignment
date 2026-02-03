import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";

import { connectDB } from "./config/db.js";
import eventRoutes from "./routes/events.route.js";
import authRoutes from "./routes/auth.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import { runScraper } from "./scraper/runscraper.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

cron.schedule("0 */6 * * *", runScraper);

app.listen(process.env.PORT, () =>
    console.log(`Backend running on port ${process.env.PORT}`)
);
