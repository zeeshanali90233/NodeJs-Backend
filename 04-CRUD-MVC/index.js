import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
