"use strict";

var Comment = require("../model/comment");

var Product = require("../model/product");

module.exports.addComment = function _callee(decode, req, res, next) {
  var productId, content, creator, newComment, product, oldProductComments, newProductComments, newProduct;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          productId = req.params.productId;
          content = req.body.content;
          creator = decode.userId;
          _context.next = 5;
          return regeneratorRuntime.awrap(new Comment({
            creator: creator,
            content: content
          }).save());

        case 5:
          newComment = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }));

        case 8:
          product = _context.sent;
          oldProductComments = product.comments;
          newProductComments = [];

          if (oldProductComments.length == 0) {
            newProductComments = [newComment._id];
          } else {
            newProductComments = oldProductComments.push(newComment._id);
          }

          _context.next = 14;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: productId
          }, {
            $set: {
              comments: newProductComments
            }
          }));

        case 14:
          newProduct = _context.sent;
          res.status(200).json({
            message: "successfully comment added",
            newProduct: newProduct
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};