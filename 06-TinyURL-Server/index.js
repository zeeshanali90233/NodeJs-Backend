import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectMongoDb } from "./Utils/mongodb.js";
import URLRoute from "./Routes/urls.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

ConnectMongoDb();

app.use("/url", URLRoute);

app.listen(5050, () => {
  console.log("I am workinf");
});
