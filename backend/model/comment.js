const mongoose = require("mongoose");
const commentSchmea = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Comment", commentSchmea);
