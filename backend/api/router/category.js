const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");
router.get("/", categoryController.getAll);
router.post("/", categoryController.createOne);
router.patch("/:id", categoryController.updateOne);

module.exports = router;
