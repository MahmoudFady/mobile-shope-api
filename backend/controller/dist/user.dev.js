"use strict";

var User = require("../model/user");

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var JWT_KEY = process.env.JWT_KEY;

module.exports.signup = function _callee(req, res, next) {
  var _req$body, name, email, phone, country, state, city, password, user, hash, newUser, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, country = _req$body.country, state = _req$body.state, city = _req$body.city, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 3:
          user = _context.sent;

          if (user) {
            res.status(409).json({
              message: "email already exist"
            });
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 7:
          hash = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(new User({
            name: name,
            email: email,
            phone: phone,
            address: {
              country: country,
              state: state,
              city: city
            },
            password: hash
          }).save());

        case 10:
          newUser = _context.sent;
          token = jwt.sign({
            userId: newUser._id,
            email: newUser.email
          }, JWT_KEY);
          res.status(200).json({
            message: "user successfully signup",
            user: newUser,
            token: token
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.signin = function _callee2(req, res, next) {
  var _req$body2, email, password, user, isPasswordSame, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("sigin works");
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (!user) {
            _context2.next = 12;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 8:
          isPasswordSame = _context2.sent;

          if (isPasswordSame) {
            token = jwt.sign({
              userId: user._id,
              email: user.email
            }, JWT_KEY);
            res.status(200).json({
              messsage: "user successfully signin",
              user: user,
              token: token
            });
          } else {
            res.status(404).json({
              message: "email or password invalid"
            });
          }

          _context2.next = 13;
          break;

        case 12:
          res.status(404).json({
            message: "login faild"
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.profile = function _callee3(req, res, next) {
  var userId, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.params.userId;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            _id: userId
          }).select("-password"));

        case 3:
          user = _context3.sent;
          res.status(200).json({
            user: user
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.edit = function (decode, req, res, next) {
  res.status(200).json({
    message: "user updated !"
  });
};