const express = require("express");
const router = express.Router();
const checkAuth = require("../../middleware/checkAuth");
const orderController = require("../controller/order");
router.post("/", checkAuth, orderController.createOne);
router.get("/", checkAuth, orderController.getUserOrders);

module.exports = router;
