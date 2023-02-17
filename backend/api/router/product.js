const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");
const productController = require("../controller/product");
router.get("/", productController.getByPagination);
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  productController.create
);
router.get("/search", productController.getBySearch);
router.get("/category/:category", productController.getByCategory);
router.get("/:id", productController.getOneById);
router.delete("/:id", productController.deleteOneById);

module.exports = router;
