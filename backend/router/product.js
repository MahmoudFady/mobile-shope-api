const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const upload = require("../middleware/upload");
const {
  getAllProducts,
  addProduct,
  getProductById,
  getProductsByCategory,
  search,
} = require("../controller/product");
router.get("/", getAllProducts);
router.post("/", upload().array("images", 5), checkAuth, addProduct);
router.get("/search/:category/:brand", search);
router.get("/category/:category", getProductsByCategory);
router.get("/:productId", getProductById);
module.exports = router;
