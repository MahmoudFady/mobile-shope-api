const orderUseCase = require("../../use-case/order");
module.exports.createOne = async (decode, req, res, next) => {
  try {
    const order = await orderUseCase.createOne(decode["userId"], req.body);
    res.status(200).json({
      message: "order created",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports.getUserOrders = async (decode, req, res, next) => {
  try {
    const orders = await orderUseCase.getUserOrders(decode["userId"]);
    res.status(200).json({
      message: "get user orders",
      orders,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
