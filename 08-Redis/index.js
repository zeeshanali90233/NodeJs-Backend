import express from "express";
import dotenv from "dotenv";
import UserRoute from "./Routes/user.js";
import { connectRedis } from "./Utils/redis.js";

dotenv.config();

const app = express();

// Connect to Redis
connectRedis();

app.use("/user", UserRoute);

app.listen(5050, () => {
  console.log("Server is running on port 5050");
});
