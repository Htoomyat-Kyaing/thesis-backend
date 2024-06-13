import e from "express";
import { verifyToken } from "../utils/verifyToken.js";

import { createItem, removeItem } from "../controllers/item.controller.js";

const router = e.Router();

router.post("/create", verifyToken, createItem);
router.delete("/delete/:id", verifyToken, removeItem);

export default router;
