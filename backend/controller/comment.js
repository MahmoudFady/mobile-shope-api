const Comment = require("../model/comment");
const Product = require("../model/product");
module.exports.addComment = async (decode, req, res, next) => {
  const { productId } = req.params;
  const { content } = req.body;
  const creator = decode.userId;
  const newComment = await new Comment({ creator, content }).save();
  const product = await Product.findOne({ _id: productId });
  const oldProductComments = product.comments;
  let newProductComments = [];
  if (oldProductComments.length == 0) {
    newProductComments = [newComment._id];
  } else {
    newProductComments = oldProductComments.push(newComment._id);
  }
  const newProduct = await Product.updateOne(
    { _id: productId }, 
    { $set: { comments: newProductComments } }
  );
  res.status(200).json({ message: "successfully comment added", newProduct });
};
