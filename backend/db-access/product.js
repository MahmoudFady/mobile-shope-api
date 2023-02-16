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
module.exports.getBySearch = (targetRexExp) => {
  const searchCriteria = [
    {
      category: { $regex: targetRexExp },
    },
    {
      brand: { $regex: targetRexExp },
    },
    {
      describtion: { $regex: targetRexExp },
    },
    {
      model: { $regex: targetRexExp },
    },
  ];
  return Product.find({
    $or: searchCriteria,
  }).select("-details -comments -images");
};
module.exports.getByCategory = (category) => {
  return Product.find({ category }).select("-details -comments -images");
};
