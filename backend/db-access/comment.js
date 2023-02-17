const Comment = require("../model/comment");
module.exports.create = (data) => {
  return new Comment(data).save();
};
