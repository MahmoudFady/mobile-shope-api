"use strict";

var express = require("express");

var router = express.Router();

var checkAuth = require("../middleware/checkAuth");

var upload = require("../middleware/upload");

var _require = require("../controller/product"),
    getAllProducts = _require.getAllProducts,
    addProduct = _require.addProduct,
    getProductById = _require.getProductById,
    getProductsByCategory = _require.getProductsByCategory,
    search = _require.search;

router.get("/", getAllProducts);
router.post("/", upload().array("images", 5), checkAuth, addProduct);
router.get("/search/:category/:brand", search);
router.get("/category/:category", getProductsByCategory);
router.get("/:productId", getProductById);
module.exports = router;