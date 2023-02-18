const Cart = require("../model/cart");
const cartPopulateOptions = {
  path: "products.product",
  select: "-comments -images -details",
};
module.exports.getProductByIdFromCart = (userId, productId) => {
  return Cart.findOne({
    user: userId,
    "products.product": productId,
  }).populate(cartPopulateOptions);
};
module.exports.createOne = (data) => {
  const { userId, productId, productPrice } = data;
  return new Cart({
    user: userId,
    products: [{ product: productId, quantity: 1 }],
    totalPrice: productPrice,
  }).save();
};
module.exports.getCartByUserId = (userId) => {
  return Cart.findOne({ user: userId }).populate(cartPopulateOptions);
};
module.exports.deleteCartByUserId = (userId) => {
  return Cart.findOneAndDelete({ user: userId }).populate(cartPopulateOptions);
};
module.exports.removeCart = (userId) => {
  return Cart.deleteOne({ user: userId });
};
module.exports.pushProduct = (userId, productId, price) => {
  return Cart.updateOne(
    { user: userId },
    {
      $set: {
        $push: { products: { product: productId, quantity: 1 } },
        $inc: { totalPrice: price },
      },
    }
  );
};
module.exports.removeProduct = (userId, productId, price) => {
  return Cart.updateOne(
    { user: userId },
    {
      $set: {
        $pull: { products: { product: productId } },
        $inc: { totalPrice: -price },
      },
    }
  );
};
module.exports.updateProductQuantity = (userId, productId, price, quan) => {
  return Cart.updateOne(
    {
      user: userId,
      "products.product": productId,
    },
    {
      $set: {
        $inc: { totalPrice: price, "products.$.quantity": quan },
      },
    }
  );
};
