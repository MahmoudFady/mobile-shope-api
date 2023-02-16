const express = require("express");
const router = express.Router();
const {
  getAllCarts,
  addToCart,
  getCartByUserId,
  deleteCartByUserId,
  removeProduct,
  getCartForUnAuthUser,
  getCartProductCount,
} = require("../controller/cart");
const checkAuth = require("../../middleware/checkAuth");
router.get("/", getAllCarts);
router.get("/productCount", checkAuth, getCartProductCount);
router.post("/unAuth", getCartForUnAuthUser);
router.post("/:productId", checkAuth, addToCart);
router.get("/:userId", checkAuth, getCartByUserId);
router.delete("/:userId", checkAuth, deleteCartByUserId);
router.patch("/:productId", checkAuth, removeProduct);

module.exports = router;
