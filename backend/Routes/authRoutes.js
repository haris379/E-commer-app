import express from "express";
import {
  signup,
  login,
  loginSpecificUser,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/login/:id", loginSpecificUser);

export default router;
