const commentDbAccess = require("../db-access/comment");
const productDbAccess = require("../db-access/product");
module.exports.create = async (productId, data) => {
  const { creator, content } = data;
  const newComment = await commentDbAccess.create({ creator, content });
  await productDbAccess.updateProductComments(productId, newComment._id);
  return newComment;
};
