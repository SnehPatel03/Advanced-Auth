import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import { connectdb } from "./database/db.js";
import authRoute from "./routes/authRoute.js"

export const app = express();

config({ path: "./config/config.env" });

app.use(
  cors({
    origin: "https://advanced-auth-3v6r.onrender.com",
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT"],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));

app.use("/auth" , authRoute);


connectdb(); 
