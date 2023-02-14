const bcrypt = require("bcrypt");
const userDbAccess = require("../db-access/user");
const generateToken = require("../services/generate-token");
module.exports.signup = async (data) => {
  const { name, email, phone, address, password } = data;
  const isUserExist = await userDbAccess.getOne({ email });
  if (isUserExist) return { message: "email already exist" };
  const hash = await bcrypt.hash(password, 10);
  const userData = { name, email, phone, address, password: hash };
  const createdUser = await userDbAccess.createOne(userData);
  const token = generateToken({ userId: createdUser._id, email });
  return { message: "signup success", user: createdUser, token };
};
module.exports.signin = async (data) => {
  const { email, password } = data;
  const user = await userDbAccess.getOne({ email });
  if (!user) return { message: "email doesn't exist" };
  const isPasswordSame = await bcrypt.compare(password, user.password);
  if (!isPasswordSame) return { message: "wrong password" };
  const token = generateToken({ userId: user._id, email });
  return { message: "signin success", user, token };
};
module.exports.getProfile = (userId) => {
  return userDbAccess.getById(userId);
};
