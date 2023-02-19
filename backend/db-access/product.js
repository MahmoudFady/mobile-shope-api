const Product = require("../model/product");
const productSchemaProjection = "-details -comments -images";
module.exports.create = (data) => new Product(data).save();
module.exports.getOneById = (id) =>
  Product.findById(id).populate({
    path: "comments",
    populate: { path: "creator", select: "name image" },
  });
module.exports.getByPagination = async (skip, limit) => {
  const productCount = await Product.count();
  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .select(productSchemaProjection);
  return { productCount, products };
};
module.exports.getBySearch = (criteria) => {
  const { priceCriteria, targetCriteria } = criteria;
  return Product.find({
    $or: targetCriteria,
    $and: priceCriteria,
  }).select(productSchemaProjection);
};
module.exports.getByCategory = (category) => {
  return Product.find({ category }).select(productSchemaProjection);
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
