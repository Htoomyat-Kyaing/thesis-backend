import e from "express";
import { verifyToken } from "../utils/verifyToken.js";

import {
  createItem,
  getItem,
  removeItem,
  updateItem,
} from "../controllers/item.controller.js";

const router = e.Router();

router.post("/create", verifyToken, createItem);
router.delete("/delete/:id", verifyToken, removeItem);
router.patch("/update/:id", verifyToken, updateItem);
router.get("/:id", getItem);

export default router;
