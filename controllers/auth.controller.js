import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/customError.js";
import jwt from "jsonwebtoken";

// include next for middleware
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const encryptedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: encryptedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (err) {
    next(errorHandler(500, "Username or Email already existed"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pw, ...userInfo } = validUser._doc;
    return res
      .cookie("access_token", token, {
        // httpOnly: true,
        // if the cookie does not have expire date, it will be automatically deleted after refresh
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    next(err);
  }
};

// req,res order important
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User signed out");
  } catch (error) {
    next(error);
  }
};
