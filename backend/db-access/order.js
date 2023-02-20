const Order = require("../model/order");
const productSchemaProjection = "-comments -images -details";
module.exports.getUserOrders = (userId) => {
  return Order.find({ user: userId })
    .populate({
      path: "products.product",
      select: productSchemaProjection,
    })
    .populate({
      path: "user",
      select: "-password -email",
    });
};
module.exports.createOne = (orderData) => {
  return new Order(orderData).save();
};
