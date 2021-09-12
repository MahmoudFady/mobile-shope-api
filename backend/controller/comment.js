const Comment = require("../model/comment");
const Product = require("../model/product");
module.exports.addComment = async (decode, req, res, next) => {
  console.log("addcoment");
  const { productId } = req.params;
  const { content } = req.body;
  const creator = decode.userId;
  let newComment = await new Comment({ creator, content }).save();
  newComment = await Comment.findById(newComment._id).populate({
    path: "creator",
  });
  const product = await Product.findOne({ _id: productId });
  let oldProductComments = product.comments;
  let newProductComments = [];
  if (oldProductComments.length == 0) {
    newProductComments = [newComment._id];
  } else {
    oldProductComments.push(newComment._id);
    newProductComments = oldProductComments;
  }
  await Product.findByIdAndUpdate(productId, {
    $set: { comments: newProductComments },
  });
  res.status(200).json({
    message: "successfully comment added",
    newComment,
  });
};
