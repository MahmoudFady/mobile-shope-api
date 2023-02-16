const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");
const {
  getByPagination,
  create,
  getProductById,
  getByCategory,
  getBySearch,
} = require("../controller/product");
router.get("/", getByPagination);
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  create
);
router.get("/search", getBySearch);
router.get("/category/:category", getByCategory);
router.get("/:id", getProductById);
module.exports = router;
