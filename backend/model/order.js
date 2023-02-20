const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  totalPrice: {
    type: Number,
  },
  contactInfo: {
    phone: Number,
  },
  location: {
    url: String,
    country: String,
    state: String,
    city: String,
  },
});
module.exports = mongoose.model("Order", orderSchema);
