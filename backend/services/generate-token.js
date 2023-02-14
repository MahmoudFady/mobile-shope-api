const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
module.exports = (encode) => {
  const token = jwt.sign(encode, JWT_KEY);
  return token;
};
