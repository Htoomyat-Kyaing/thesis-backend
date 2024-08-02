import { errorHandler } from "./customError.js";

export const checkRole = (req, res, next) => {
  if (req.body.role !== "admin")
    return next(errorHandler(401, "Only admin can access this "));
  next();
};
