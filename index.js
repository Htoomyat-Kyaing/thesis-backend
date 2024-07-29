import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import itemRouter from "./routes/item.route.js";
import adminRouter from "./routes/admin.route.js";
import checkoutRouter from "./routes/checkout.route.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();

const __dirname = path.resolve();

const app = express();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(5173, () => {
  console.log("Server is running on port 5173");
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/item", itemRouter);
app.use("/checkout", checkoutRouter);

app.use(express.static(path.join(__dirname, "/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//middleware
// ** you have to put req res near next
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
