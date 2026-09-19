import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getAllCategory,
  getProductWithCategory,
  updateProduct,
} from "../controller/productController.js";

const router = express.Router();

router.get("/allCategories", getAllCategory);
router.get("/categories", getProductWithCategory);

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/add-product", addProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

export default router;
