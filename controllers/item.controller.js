import Item from "../models/item.model.js";

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
