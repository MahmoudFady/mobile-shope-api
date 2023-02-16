"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controller/comment"),
    addComment = _require.addComment;

var checkAuth = require("../middleware/checkAuth");

router.post("/:productId", checkAuth, addComment);
module.exports = router;