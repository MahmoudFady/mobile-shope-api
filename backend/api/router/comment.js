const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment");
const checkAuth = require("../../middleware/checkAuth");
router.post("/:productId", checkAuth, commentController.create);
module.exports = router;
