import cors from "cors";
import express from "express";
import Product from "./model/Product.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

ConnectDB();

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const newProductFields = req.body;
    const newProduct = new Product(newProductFields);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findOneAndDelete({ id });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductFields = req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      updatedProductFields,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
