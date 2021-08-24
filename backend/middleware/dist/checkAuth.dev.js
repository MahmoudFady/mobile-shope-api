"use strict";

var jwt = require("jsonwebtoken");

var JWT_KEY = process.env.JWT_KEY;

module.exports = function (req, res, next) {
  try {
    var token = req.headers["authorization"].split(" ")[1];
    var decode = jwt.verify(token, JWT_KEY);
    next(decode);
  } catch (error) {
    res.status(401).json({
      message: "auth faild",
      error: error.message
    });
  }
};