import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
} from "../controller/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add-product", addProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
