import express from "express";
import { addItem, removeItem } from "../controller/cartController.js";
const router = express.Router();

router.post("/addToCart", addItem);
router.post("/removeItem", removeItem);

export default router;
