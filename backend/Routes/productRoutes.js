import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getAllCategory,
  getProductWithCategory
} from "../controller/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add-product", addProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/categories", getAllCategory);
router.get("/categories/:category", getProductWithCategory);

export default router;
