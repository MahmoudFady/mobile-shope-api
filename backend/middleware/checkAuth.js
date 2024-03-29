const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/keys");
module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decode = jwt.verify(token, JWT_KEY);
    next(decode);
  } catch (error) {
    res.status(401).json({
      message: "auth faild",
      error: error.message,
    });
  }
};
