import express from "express";
import dotenv from "dotenv";
import UserRoute from "./Routes/user.js";

dotenv.config();

const app = express();

app.use("/user", UserRoute);

app.listen(5050, () => {
  console.log("Server is running on port 5050");
});
