const express = require("express");
const path = require("path");
const app = express();

// #### routes src
const userRoutes = require("./api/router/user");
const productRoutes = require("./api/router/product");
const commentRoutes = require("./api/router/comment");
const cartRoutes = require("./api/router/cart");
const orderRoutes = require("./api/router/order");

// #### routes src
// ++++++++++++++++++

// #### installed modules in app

const morgan = require("morgan");

// #### installed modules in app

// ++++++++++++++++++++++++++++

// #### custom middleware

const dbConnection = require("./config/dbConnection");

// #### custom middleware

// ++++++++++++++++++++++++++++

// #### app configration

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// #### app configration

// ++++++++++++++++++++++++++++

// #### setup cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type , X-Request, authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET , POST , UPDATE , DELETE , PATCH , DELETE"
  );
  next();
});
// #### setup cors
// #### make uploads folder static to access uploaded images
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// ++++++++++++++++++++++++++++

// #### database setup

dbConnection();

// #### database setup

// +++++++++++++++++++++++++
// #### app routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// #### app routes
// +++++++++++++++++++++++++

module.exports = app;
