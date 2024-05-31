import e from "express";
import { signup } from "../controllers/auth.controller.js";
import { signin } from "../controllers/auth.controller.js";

const router = e.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);

export default router;
