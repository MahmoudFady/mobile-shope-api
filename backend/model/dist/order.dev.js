"use strict";

var mongoose = require("mongoose");

var orderSchmea = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
  price: {
    type: Number
  },
  count: Number
});
module.exports = mongoose.model("Order", orderSchmea);