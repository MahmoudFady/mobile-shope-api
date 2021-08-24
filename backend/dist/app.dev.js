"use strict";

var express = require("express");

var path = require("path");

var app = express(); // #### routes src

var userRoutes = require("./router/user");

var productRoutes = require("./router/product");

var commentRoutes = require("./router/comment");

var cartRoutes = require("./router/cart"); // #### routes src
// ++++++++++++++++++
// #### installed modules in app


var morgan = require("morgan"); // #### installed modules in app
// ++++++++++++++++++++++++++++
// #### custom middleware


var dbConnection = require("./middleware/dbConnection"); // #### custom middleware
// ++++++++++++++++++++++++++++
// #### app configration


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
})); // #### app configration
// ++++++++++++++++++++++++++++
// #### setup cors

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , X-Request, authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET , POST , UPDATE , DELETE , PATCH");
  next();
}); // #### setup cors
// #### make uploads folder static to access uploaded images

app.use("/uploads", express["static"](path.join(__dirname + "/uploads"))); // ++++++++++++++++++++++++++++
// #### database setup

dbConnection(); // #### database setup
// +++++++++++++++++++++++++
// #### app routes

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/comment", commentRoutes);
app.use("/cart", cartRoutes); // #### app routes
// +++++++++++++++++++++++++

module.exports = app;