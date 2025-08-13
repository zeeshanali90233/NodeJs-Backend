import express from "express";
import { SaveURL } from "../Controllers/SaveURL.js";
import { RedirectURL } from "../Controllers/RedirectURL.js";

const router = express.Router();

router.post("/save", SaveURL);
router.get("/:shortId", RedirectURL);

export default router;
