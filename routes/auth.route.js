import e from "express";
import { signup } from "../controllers/auth.controller.js";

const router = e.Router();

router.post("/sign-up", signup);

export default router;
