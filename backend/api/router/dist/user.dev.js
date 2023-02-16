"use strict";

var express = require("express");

var router = express.Router();

var upload = require("../middleware/upload");

var checkAuth = require("../middleware/checkAuth");

var _require = require("../controller/user"),
    signup = _require.signup,
    signin = _require.signin,
    profile = _require.profile,
    edit = _require.edit;

router.get("/:userId", profile);
router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/:userId", upload().single("image"), checkAuth, edit);
module.exports = router;