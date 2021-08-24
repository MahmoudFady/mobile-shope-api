const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/");
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    const filename = date + file.originalname;
    cb(null, filename);
  },
});
const upload = () => {
  return multer({ storage });
};
module.exports = upload;
 