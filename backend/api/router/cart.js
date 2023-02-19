const express = require("express");
const router = express.Router();
const checkAuth = require("../../middleware/checkAuth");
const cartController = require("../controller/cart");
router.get("/", checkAuth, cartController.getCartByUserId);
router.post("/new/:productId", checkAuth, cartController.createOne);
router.delete("/", checkAuth, cartController.deleteCartByUserId);
router.post("/:productId", checkAuth, cartController.pushProduct);
router.delete("/:productId", checkAuth, cartController.removeProduct);
router.patch("/:productId", checkAuth, cartController.updateProductQuan);

module.exports = router;
