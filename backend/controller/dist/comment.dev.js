"use strict";

var Comment = require("../model/comment");

var Product = require("../model/product");

module.exports.addComment = function _callee(decode, req, res, next) {
  var productId, content, creator, newComment, product, oldProductComments, newProductComments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("addcoment");
          productId = req.params.productId;
          content = req.body.content;
          creator = decode.userId;
          _context.next = 6;
          return regeneratorRuntime.awrap(new Comment({
            creator: creator,
            content: content
          }).save());

        case 6:
          newComment = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(Comment.findById(newComment._id).populate({
            path: "creator"
          }));

        case 9:
          newComment = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: productId
          }));

        case 12:
          product = _context.sent;
          oldProductComments = product.comments;
          newProductComments = [];

          if (oldProductComments.length == 0) {
            newProductComments = [newComment._id];
          } else {
            oldProductComments.push(newComment._id);
            newProductComments = oldProductComments;
          }

          _context.next = 18;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(productId, {
            $set: {
              comments: newProductComments
            }
          }));

        case 18:
          res.status(200).json({
            message: "successfully comment added",
            newComment: newComment
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
};