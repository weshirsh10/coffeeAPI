const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    order: [
      {
        amount: String,
        size: String,
        coffeeType: String,
        milk: String,
        sweetener: String,
      },
    ],
    state: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
