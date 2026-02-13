import Product from "../Models/product.js";
import { verifyJWT } from "../Utils/jwt.js";

async function getAllProducts(req, res) {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(401).json({ error: "Token required" });
    }
    const decoded = verifyJWT(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addProduct(req, res) {
  try {
    const { title, imageURL, description, token } = req.body;
    if (!token) {
      return res.status(401).json({ error: "Token required" });
    }
    const decoded = verifyJWT(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (!title || !imageURL || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newProduct = new Product({
      title,
      imageURL,
      description,
      ownerUsername: decoded.username,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { addProduct, getAllProducts };
