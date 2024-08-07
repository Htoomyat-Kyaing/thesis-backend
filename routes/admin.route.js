import e from "express";
import User from "../models/user.model.js";
import { checkRole } from "../utils/checkRole.js";
import Item from "../models/item.model.js";
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

router.delete("/delete-item/:id", checkRole, async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json({
      message: `Item ${item.name} has been already yeeted and deleted if you are seeing this message`,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/allitems", checkRole, async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

router.patch("/update-item/:itemId", checkRole, async (req, res, next) => {
  const { role, ...itemInfo } = req.body;
  // res.status(200).json(itemInfo);
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return next(errorHandler(404, "Item doesn't exist"));
    // if (req.user.id !== item.userRef)
    //   return next(errorHandler(401, "You can only remove your item"));
    if (req.body.imageUrl === null)
      return next(
        errorHandler(
          500,
          "Item validation failed: imageUrl: Path `imageUrl` is required."
        )
      );
    // const { role, ...itemInfo } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.itemId,
      itemInfo,
      {
        new: true,
      }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
});

export default router;
