"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controller/cart"),
    getAllCarts = _require.getAllCarts,
    addToCart = _require.addToCart,
    getCartByUserId = _require.getCartByUserId,
    deleteCartByUserId = _require.deleteCartByUserId,
    removeProduct = _require.removeProduct,
    getCartForUnAuthUser = _require.getCartForUnAuthUser,
    getCartProductCount = _require.getCartProductCount;

var checkAuth = require("../middleware/checkAuth");

router.get("/", getAllCarts);
router.get("/productCount", checkAuth, getCartProductCount);
router.post("/unAuth", getCartForUnAuthUser);
router.post("/:productId", checkAuth, addToCart);
router.get("/:userId", checkAuth, getCartByUserId);
router["delete"]("/:userId", checkAuth, deleteCartByUserId);
router.patch("/:productId", checkAuth, removeProduct);
module.exports = router;