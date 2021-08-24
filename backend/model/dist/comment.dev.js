"use strict";

var mongoose = require("mongoose");

var commentSchmea = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("Comment", commentSchmea);