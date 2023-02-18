const express = require("express");
const router = express.Router();
const checkAuth = require("../../middleware/checkAuth");
router.get("/:userId" , checkAuth );
module.exports = router;
