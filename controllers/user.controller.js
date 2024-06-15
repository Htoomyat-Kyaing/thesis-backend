import Item from "../models/item.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/customError.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...userInfo } = updateUser._doc;
    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, "You can only update your account"));
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json("User not found");

    const { password, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const getUserItems = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const items = await Item.find({ userRef: req.params.id });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your items"));
  }
};
