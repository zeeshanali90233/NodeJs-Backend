import express from "express";
import { getAllAdmins, loginUser } from "../Controllers/user.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/admins", getAllAdmins);

export default router;
