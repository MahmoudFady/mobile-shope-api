const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const { signup, signin, profile } = require("../controller/user");
router.get("/", checkAuth, profile);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
