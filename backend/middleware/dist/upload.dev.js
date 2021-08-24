"use strict";

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "backend/uploads/");
  },
  filename: function filename(req, file, cb) {
    var date = Date.now();
    var filename = date + file.originalname;
    cb(null, filename);
  }
});

var upload = function upload() {
  return multer({
    storage: storage
  });
};

module.exports = upload;