//Schema code for user

const mongoose = require("mongoose");

const order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
    status: {
      type: String,
      default: "Ordered",
      enum: ["Ordered", "Out for Delievery , Canceled , Delievered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", order);
