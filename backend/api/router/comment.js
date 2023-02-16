const express = require("express");
const router = express.Router();
const { addComment } = require("../controller/comment");
const checkAuth = require("../../middleware/checkAuth");
router.post("/:productId", checkAuth, addComment);
module.exports = router;
