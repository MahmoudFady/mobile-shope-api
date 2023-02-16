const Product = require("../../model/product");
module.exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find().select("-comments");
  res.status(200).json({
    message: "all products",
    products,
  });
};
module.exports.addProduct = async (decode, req, res, next) => {
  console.log("add product works !!");
  const {
    category,
    brand,
    model,
    describtion,
    color,
    size,
    storage,
    ram,
    processor,
    battery,
    price,
    discount,
    count,
  } = req.body;
  const urtlBase = `${req.protocol}://${req.get("host")}/uploads/`;
  const images = req.files.map((file) => {
    return urtlBase + file.filename;
  });
  const newProduct = await new Product({
    category,
    brand,
    model,
    images,
    describtion,
    properties: { color, size, storage, ram, processor, battery },
    price,
    discount,
    count,
  }).save();
  if (newProduct) {
    res.status(200).json({
      message: "product addedd successfully",
      newProduct,
    });
  } else {
    res.status(204).json({ message: "something go wrong !" });
  }
};
module.exports.getProductsByCategory = async (req, res, next) => {
  const { category } = req.params;
  const products = await Product.find({ category }).select("-comments");
  res.status(200).json({
    message: "product category of " + category,
    products,
  });
};
module.exports.getProductById = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate({
    path: "comments",
    populate: {
      path: "creator",
      select: "image  _id name",
    },
  });
  if (!product) {
    res.status(209).json({
      message: "something go wrong",
    });
  } else {
    res.status(200).json({
      message: "successfully get product",
      product,
    });
  }
};
module.exports.search = async (req, res, next) => {
  const { category, brand } = req.params;
  const products = await Product.find({ category, brand }).select(
    "-properties -comments"
  );
  res.status(200).json({
    message: "search resualt",
    products,
  });
};
