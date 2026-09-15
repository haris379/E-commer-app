import express from "express";
import { addtoCart } from "../controller/cartController.js";
const router = express.Router();

router.post("/addToCart", addtoCart);

export default router;
