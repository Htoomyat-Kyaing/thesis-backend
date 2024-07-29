import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/thesis-firebase-xdd.appspot.com/o/default.jpg?alt=media&token=532998b8-a491-4038-8cb6-a5c0e5b44db2",
    },
    cart: {
      type: Array,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
