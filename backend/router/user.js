const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const checkAuth = require("../middleware/checkAuth");
const { signup, signin, profile, edit } = require("../controller/user");
router.get("/:userId", profile);
router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/:userId", upload().single("image"), checkAuth, edit);

module.exports = router;
