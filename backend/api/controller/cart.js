const cart = require("../../model/cart");
const cartUseCase = require("../../use-case/cart");
module.exports.getCartByUserId = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const cart = await cartUseCase.getCartByUserId(userId);
    res.status(200).json({
      message: "get user cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.createOne = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const { productId } = req.params;
    const productPrice = +req.query["productPrice"];
    const cart = await cartUseCase.createOne(userId, productId, productPrice);
    res.status(200).json({
      message: "cart created , product add to cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.deleteCartByUserId = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const cart = await cartUseCase.deleteCartByUserId(userId);
    res.status(200).json({
      message: "product removed",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.pushProduct = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const { productId } = req.params;
    const productPrice = +req.query["productPrice"];
    const cart = await cartUseCase.pushProduct(userId, productId, productPrice);
    res.status(200).json({
      message: "product add to cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.removeProduct = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const { productId } = req.params;
    const productPrice = +req.query["productPrice"];
    const productQuantity = +req.query["productQuantity"];
    const cart = await cartUseCase.removeProduct(
      userId,
      productId,
      productPrice,
      productQuantity
    );
    res.status(200).json({
      message: "product removed form cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.updateProductQuan = async (decode, req, res, next) => {
  try {
    const { userId } = decode;
    const { productId } = req.params;
    let increaser = +req.query["increaser"];
    let productPrice = +req.query["productPrice"];
    const cart = await cartUseCase.updateProductQuantity(
      userId,
      productId,
      productPrice,
      increaser
    );
    res.status(200).json({
      message: "product quantity updated",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
