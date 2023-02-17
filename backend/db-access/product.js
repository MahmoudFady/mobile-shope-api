const Product = require("../model/product");
module.exports.create = (data) => new Product(data).save();
module.exports.getOneById = (id) => Product.findById(id);
module.exports.getByPagination = async (skip, limit) => {
  const productCount = await Product.count();
  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .select("-details -comments -images");
  return { productCount, products };
};
module.exports.getBySearch = (criteria) => {
  const { priceCriteria, targetCriteria } = criteria;
  return Product.find({
    $or: targetCriteria,
    $and: priceCriteria,
  }).select("-details -comments -images");
};
module.exports.getByCategory = (category) => {
  return Product.find({ category }).select("-details -comments -images");
};
module.exports.deleteOneById = (id) => Product.findByIdAndDelete(id);
module.exports.updateOneById = (id, updatedData) => {
  return Product.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $set: updatedData,
    },
    {
      new: true,
    }
  ).select("-comments");
};
module.exports.updateProductComments = (productId, commentId) => {
  return Product.updateOne(
    { _id: productId },
    {
      $push: { comments: commentId },
    }
  );
};
