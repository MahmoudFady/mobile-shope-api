const mongoose = require("mongoose");
const cartSchmea = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  price: {
    type: Number,
  },
  productCount: Number,
});
module.exports = mongoose.model("Cart", cartSchmea);
