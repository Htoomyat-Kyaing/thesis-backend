import e from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";

const router = e.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.get("/sign-out", signout);

export default router;
