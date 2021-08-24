const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "http://localhost:3000/uploads/defualt.png",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    country: String,
    state: String,
    city: String,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", userSchema);
