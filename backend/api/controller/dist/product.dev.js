"use strict";

var Product = require("../model/product");

module.exports.getAllProducts = function _callee(req, res, next) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Product.find().select("-comments"));

        case 2:
          products = _context.sent;
          res.status(200).json({
            message: "all products",
            products: products
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.addProduct = function _callee2(decode, req, res, next) {
  var _req$body, category, brand, model, describtion, color, size, storage, ram, processor, battery, price, discount, count, urtlBase, images, newProduct;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("add product works !!");
          _req$body = req.body, category = _req$body.category, brand = _req$body.brand, model = _req$body.model, describtion = _req$body.describtion, color = _req$body.color, size = _req$body.size, storage = _req$body.storage, ram = _req$body.ram, processor = _req$body.processor, battery = _req$body.battery, price = _req$body.price, discount = _req$body.discount, count = _req$body.count;
          urtlBase = "".concat(req.protocol, "://").concat(req.get("host"), "/uploads/");
          images = req.files.map(function (file) {
            return urtlBase + file.filename;
          });
          _context2.next = 6;
          return regeneratorRuntime.awrap(new Product({
            category: category,
            brand: brand,
            model: model,
            images: images,
            describtion: describtion,
            properties: {
              color: color,
              size: size,
              storage: storage,
              ram: ram,
              processor: processor,
              battery: battery
            },
            price: price,
            discount: discount,
            count: count
          }).save());

        case 6:
          newProduct = _context2.sent;

          if (newProduct) {
            res.status(200).json({
              message: "product addedd successfully",
              newProduct: newProduct
            });
          } else {
            res.status(204).json({
              message: "something go wrong !"
            });
          }

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.getProductsByCategory = function _callee3(req, res, next) {
  var category, products;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          category = req.params.category;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.find({
            category: category
          }).select("-comments"));

        case 3:
          products = _context3.sent;
          res.status(200).json({
            message: "product category of " + category,
            products: products
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.getProductById = function _callee4(req, res, next) {
  var productId, product;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          productId = req.params.productId;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }).populate({
            path: "comments",
            populate: {
              path: "creator",
              select: "image  _id name"
            }
          }));

        case 3:
          product = _context4.sent;

          if (!product) {
            res.status(209).json({
              message: "something go wrong"
            });
          } else {
            res.status(200).json({
              message: "successfully get product",
              product: product
            });
          }

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.search = function _callee5(req, res, next) {
  var _req$params, category, brand, products;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$params = req.params, category = _req$params.category, brand = _req$params.brand;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Product.find({
            category: category,
            brand: brand
          }).select("-properties -comments"));

        case 3:
          products = _context5.sent;
          res.status(200).json({
            message: "search resualt",
            products: products
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};