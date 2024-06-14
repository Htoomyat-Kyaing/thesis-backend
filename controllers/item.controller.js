import Item from "../models/item.model.js";
import mongoose from "mongoose";
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
