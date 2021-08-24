const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  images: Array,
  describtion: {
    type: String,
    required: true,
  },
  properties: {
    color: String,
    size: String,
    storage: String,
    ram: String,
    processor: String,
    battery: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  count: {
    type: Number,
    required: true,
    defualt: 0,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
module.exports = mongoose.model("Product", productSchema);
