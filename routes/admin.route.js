import e from "express";
import User from "../models/user.model.js";
import { checkRole } from "../utils/checkRole.js";
// import dotenv from "dotenv";

// dotenv.config();

const router = e.Router();
router.post("/allusers", checkRole, async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete-user/:id", checkRole, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: `User ${user.username} has been already yeeted and deleted if you are seeing this message`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
