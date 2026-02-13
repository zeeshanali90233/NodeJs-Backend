import express from "express";
import { createUser, loginUser } from "../Controllers/user.js";
import { addProduct, getAllProducts } from "../Controllers/product.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/createuser", createUser);

router.post("/addproduct", addProduct);
router.get("/products", getAllProducts);

export default router;
