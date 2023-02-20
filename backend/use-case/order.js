const orderDbAccesss = require("../db-access/order");
const cartDbAccess = require("../db-access/cart");
module.exports.createOne = async (userId, reqBody) => {
  const { products, totalPrice } = await cartDbAccess.deleteCartByUserId(
    userId
  );
  const { location, contactInfo } = reqBody;
  const orderData = {
    user: userId,
    products,
    totalPrice,
    location,
    contactInfo,
  };
  return orderDbAccesss.createOne(orderData);
};
module.exports.getUserOrders = (userId) => {
  return orderDbAccesss.getUserOrders(userId);
};
