import express from "express";
import {
  updateUser,
  getUserItems,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.get("/items/:id", verifyToken, getUserItems);
router.get("/:id", getUser);

export default router;
