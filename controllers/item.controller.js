import Item from "../models/item.model.js";
import { errorHandler } from "../utils/customError.js";

export const createItem = async (req, res, next) => {
  const data = req.body;

  const newItem = new Item(data);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

export const removeItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return next(errorHandler(404, "Item doesn't exist"));
    if (req.user.id !== item.userRef)
      return next(errorHandler(401, "You can only remove your item"));
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json("Item has been removed successfully");
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return next(errorHandler(404, "Item doesn't exist"));
    if (req.user.id !== item.userRef)
      return next(errorHandler(401, "You can only remove your item"));
    if (req.body.imageUrl === null)
      return next(
        errorHandler(
          500,
          "Item validation failed: imageUrl: Path `imageUrl` is required."
        )
      );

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return next(errorHandler(404, "Item doesn't exist"));

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const getItems = async (req, res, next) => {
  // res.status(200).json("test");
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex || 0);
    let categoryTerm = req.query.category || "";
    let excludeUserRef = req.query.excludeUserRef || "";
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const items = await Item.find({
      name: { $regex: searchTerm, $options: "i" },
      category: { $regex: categoryTerm, $options: "i" },
      userRef: { $ne: excludeUserRef },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};
