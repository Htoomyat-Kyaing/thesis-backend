import express from "express";
import { updateUser, getUserItems } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.get("/items/:id", verifyToken, getUserItems);

export default router;
