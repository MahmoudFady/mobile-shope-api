"use strict";

function calcPrice(price, discount) {
  return price - price * (discount / 100);
}

var Cart = require("../model/cart");

var Product = require("../model/product");

module.exports.getAllCarts = function _callee(req, res, next) {
  var carts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Cart.find());

        case 2:
          carts = _context.sent;
          res.status(200).json({
            message: "successfully get all carts",
            carts: carts
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.addToCart = function _callee2(decode, req, res, next) {
  var userId, productId, product, oldCart, updatedCart, products, price, productCount;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = decode.userId;
          productId = req.params.productId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }).select("price discount count"));

        case 4:
          product = _context2.sent;

          if (!(product.count != 0)) {
            _context2.next = 25;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(Cart.findOne({
            userId: userId
          }));

        case 8:
          oldCart = _context2.sent;
          updatedCart = null;

          if (!oldCart) {
            _context2.next = 18;
            break;
          }

          products = oldCart.products, price = oldCart.price, productCount = oldCart.productCount;
          products.push(productId);
          _context2.next = 15;
          return regeneratorRuntime.awrap(Cart.findOneAndUpdate({
            userId: userId
          }, {
            $set: {
              products: products,
              productCount: productCount + 1,
              price: price + calcPrice(product.price, product.discount)
            }
          }, {
            "new": true
          }));

        case 15:
          updatedCart = _context2.sent;
          _context2.next = 21;
          break;

        case 18:
          _context2.next = 20;
          return regeneratorRuntime.awrap(new Cart({
            userId: userId,
            products: [productId],
            price: calcPrice(product.price, product.discount),
            productCount: 1
          }).save());

        case 20:
          updatedCart = _context2.sent;

        case 21:
          if (!updatedCart) {
            _context2.next = 25;
            break;
          }

          _context2.next = 24;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: product._id
          }, {
            $set: {
              count: product.count - 1
            }
          }));

        case 24:
          res.status(200).json({
            message: "product add successfully",
            updatedCart: updatedCart
          });

        case 25:
          res.status(406).json({
            message: "product out of stock now"
          });

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.getCartByUserId = function _callee3(decode, req, res, next) {
  var userId, usId, cart;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = decode.userId;
          usId = req.params["userId"];

          if (!(userId == usId)) {
            _context3.next = 9;
            break;
          }

          _context3.next = 5;
          return regeneratorRuntime.awrap(Cart.findOne({
            userId: userId
          }).populate({
            path: "products",
            select: "brand model price discount images"
          }));

        case 5:
          cart = _context3.sent;
          res.status(200).json({
            message: "successfully get cart",
            cart: cart
          });
          _context3.next = 10;
          break;

        case 9:
          res.status(202).json({
            message: "auth faild"
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.deleteCartByUserId = function _callee4(decode, req, res, next) {
  var userId, usId, cart;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = decode.userId;
          usId = req.params["userId"];

          if (!(userId == usId)) {
            _context4.next = 9;
            break;
          }

          _context4.next = 5;
          return regeneratorRuntime.awrap(Cart.findOneAndDelete({
            userId: userId
          }));

        case 5:
          cart = _context4.sent;
          res.status(200).json({
            message: "successfully delete cart",
            cart: cart
          });
          _context4.next = 10;
          break;

        case 9:
          res.status(202).json({
            message: "auth faild"
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.removeProduct = function _callee5(decode, req, res, next) {
  var productId, userId, oldCart, products, productCount, price, index, prodPrice, prodDiscount, newCart;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // FIRST GET PRODUCT ID AND USER ID
          productId = req.params.productId;
          userId = decode.userId; // GET OLD CART TO UPDATE IT

          _context5.next = 4;
          return regeneratorRuntime.awrap(Cart.findOne({
            userId: userId
          }).populate({
            path: "products",
            select: "price discount"
          }));

        case 4:
          oldCart = _context5.sent;
          // EXTRACT INFO FROM OLD CART
          products = oldCart.products, productCount = oldCart.productCount, price = oldCart.price; // IF IT IS THE LAST PRODUCT IN CART THEN WE DELETE THE CART

          if (!(products.length == 1 && products[0]._id == productId)) {
            _context5.next = 12;
            break;
          }

          _context5.next = 9;
          return regeneratorRuntime.awrap(Cart.deleteOne({
            userId: userId
          }));

        case 9:
          res.status(200).json({
            message: "cart deleted "
          });
          _context5.next = 22;
          break;

        case 12:
          // FIND INDEX OF PRODUCT TO REMOVE
          index = products.findIndex(function (p) {
            return p._id == productId;
          });
          prodPrice = products[index].price;
          prodDiscount = products[index].discount;
          products.splice(index, 1); // AFTER UPDATE THE PRODUCT PROPERTY THEN LISTEN CHANGES TO DATA BASE

          _context5.next = 18;
          return regeneratorRuntime.awrap(Cart.findOneAndUpdate({
            userId: userId
          }, {
            $set: {
              products: products,
              productCount: productCount - 1,
              price: price - calcPrice(prodPrice, prodDiscount)
            }
          }, {
            "new": true
          }));

        case 18:
          newCart = _context5.sent;
          _context5.next = 21;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(productId, {
            $inc: {
              count: 1
            }
          }));

        case 21:
          res.status(200).json({
            message: "product removed from cart ",
            newCart: newCart
          });

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports.getCartForUnAuthUser = function _callee6(req, res, next) {
  var cartProducts, products, price, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id, product;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          cartProducts = req.body.cartProducts;
          console.log(cartProducts);
          products = [];
          price = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context6.prev = 7;
          _iterator = cartProducts[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context6.next = 19;
            break;
          }

          id = _step.value;
          _context6.next = 13;
          return regeneratorRuntime.awrap(Product.findById(id).select("brand model price discount images"));

        case 13:
          product = _context6.sent;
          products.push(product);
          price += product.price - product.price * (product.discount / 100);

        case 16:
          _iteratorNormalCompletion = true;
          _context6.next = 9;
          break;

        case 19:
          _context6.next = 25;
          break;

        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context6.t0;

        case 25:
          _context6.prev = 25;
          _context6.prev = 26;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 28:
          _context6.prev = 28;

          if (!_didIteratorError) {
            _context6.next = 31;
            break;
          }

          throw _iteratorError;

        case 31:
          return _context6.finish(28);

        case 32:
          return _context6.finish(25);

        case 33:
          res.status(200).json({
            message: "products",
            cart: {
              products: products,
              productCount: products.length,
              price: price
            }
          });

        case 34:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[7, 21, 25, 33], [26,, 28, 32]]);
};

module.exports.getCartProductCount = function _callee7(decode, req, res, next) {
  var userId, _ref, productCount;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          userId = decode.userId;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Cart.findOne({
            userId: userId
          }).select("productCount"));

        case 3:
          _ref = _context7.sent;
          productCount = _ref.productCount;

          if (productCount) {
            res.status(200).json({
              productCount: productCount
            });
          } else {
            res.status(200).json({
              productCount: 0
            });
          }

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
};