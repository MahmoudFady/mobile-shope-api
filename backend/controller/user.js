const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
module.exports.signup = async (req, res, next) => {
  const { name, email, phone, country, state, city, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "email already exist" });
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = await new User({
    name,
    email,
    phone,
    address: {
      country,
      state,
      city,
    },
    password: hash,
  }).save();
  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    JWT_KEY
  );
  res
    .status(200)
    .json({ message: "user successfully signup", user: newUser, token });
};
module.exports.signin = async (req, res, next) => {
  console.log("sigin works");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (isPasswordSame) {
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_KEY);
      res.status(200).json({
        messsage: "user successfully signin",
        user,
        token,
      });
    } else {
      res.status(404).json({
        message: "email or password invalid",
      });
    }
  } else {
    res.status(404).json({
      message: "login faild",
    });
  }
};
module.exports.profile = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");
  res.status(200).json({
    user,
  });
};
module.exports.edit = (decode, req, res, next) => {
  res.status(200).json({
    message: "user updated !",
  });
};
