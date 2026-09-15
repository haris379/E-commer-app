import express from "express";
import { addItem, removeItem, getCart } from "../controller/cartController.js";
const router = express.Router();

router.post("/addToCart", addItem);
router.post("/removeItem", removeItem);
router.get("/:userId", getCart);

export default router;
