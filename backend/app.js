const express = require("express");
const path = require("path");
const app = express();

// #### routes src
const userRoutes = require("./router/user");
const productRoutes = require("./router/product");
const commentRoutes = require("./router/comment");
const cartRoutes = require("./router/cart");

// #### routes src
// ++++++++++++++++++

// #### installed modules in app

const morgan = require("morgan");

// #### installed modules in app

// ++++++++++++++++++++++++++++

// #### custom middleware

const dbConnection = require("./middleware/dbConnection");

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
    "GET , POST , UPDATE , DELETE , PATCH"
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
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/comment", commentRoutes);
app.use("/cart", cartRoutes);

// #### app routes
// +++++++++++++++++++++++++

module.exports = app;
