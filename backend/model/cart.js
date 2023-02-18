const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  products: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalPrice: Number,
});
module.exports = mongoose.model("Cart", cartSchema);
