const Product = require("../../model/product");
const productUseCase = require("../../use-case/product");
module.exports.getByPagination = async (req, res, next) => {
  try {
    const data = await productUseCase.getByPagination(req.query);
    res.status(200).json({ message: "get all products", ...data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.create = async (req, res, next) => {
  try {
    const product = await productUseCase.create(req);
    res.status(200).json({
      message: "product created",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.getByCategory = async (req, res, next) => {
  try {
    const category = req.params["category"];
    const products = await productUseCase.getByCategory(category);
    res.status(200).json({
      message: "get products by category",
      length: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.getProductById = async (req, res, next) => {
  try {
    const product = await productUseCase.getOneById(req.params.id);
    res.status(200).json({
      message: "get product details by id",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.getBySearch = async (req, res, next) => {
  try {
    const products = await productUseCase.getBySearch(req.query);
    res.status(200).json({
      message: "get product by search",
      length: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
