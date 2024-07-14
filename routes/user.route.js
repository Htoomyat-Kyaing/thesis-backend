import express from "express";
import {
  updateUser,
  getUserItems,
  getUser,
  updateUserCart,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.post("/update-cart/:id", verifyToken, updateUserCart);
router.get("/items/:id", verifyToken, getUserItems);
router.get("/:id", getUser);

export default router;
