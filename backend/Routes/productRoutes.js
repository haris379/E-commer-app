import express from "express";
import { addProduct, deleteProduct } from "../controller/productController.js";

const router = express.Router();

router.post("/add-product", addProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
