const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  brand: String,
  model: String,
  thumbnail: String,
  images: Array,
  describtion: String,
  price: Number,
  discount: Number,
  count: Number,
  details: {
    processor: String,
    screen: {
      size: String,
      type: String,
    },
    storage: {
      room: String,
      ram: String,
    },
    color: String,
    battery: String,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
module.exports = mongoose.model("Product", productSchema);
