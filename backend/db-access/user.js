const User = require("../model/user");
module.exports.createOne = (data) => {
  return new User(data).save();
};
module.exports.getOne = (query) => {
  return User.findOne(query);
};
module.exports.getById = (id) => {
  return User.findById(id).select("-password");
};
