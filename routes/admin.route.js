import e from "express";
import User from "../models/user.model.js";
// import dotenv from "dotenv";

// dotenv.config();

const router = e.Router();
router.get("/get/allusers", async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, "You can only update your account"));
  try {
    // const user = await User.findById(req.params.id);
    // if (!user) res.status(404).json("User not found");
    // const { password, ...userInfo } = user._doc;
    // res.status(200).json(userInfo);
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
