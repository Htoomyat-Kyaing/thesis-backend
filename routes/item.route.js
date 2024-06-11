import e from "express";
import { verifyToken } from "../utils/verifyToken.js";

import { createItem } from "../controllers/item.controller.js";

const router = e.Router();

router.post("/create", verifyToken, createItem);

export default router;
