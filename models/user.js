//Schema code - This is the base code all the backend code is connected to schema code

const mongoose = require("mongoose");

const user = new mongoose.Schema(
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
    address: {
      type: String,
      default: true,
    },
    avatar: {
      type: String,
      default:
        "https://s3-eu-west-1.amazonaws.com/files.mixam.com/blog/4714f3f3-f2ec-4578-aad8-e743ee4ba07b.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"], //used to change roles from user to admin and vice versa
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      }, 
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
