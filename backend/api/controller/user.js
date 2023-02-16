const userUseCase = require("../../use-case/user");
module.exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { message, user, token } = await userUseCase.signup(req.body);
    if (!user || !token) return res.status(404).json({ message });
    res.status(200).json({ message, user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.signin = async (req, res, next) => {
  try {
    const { message, user, token } = await userUseCase.signin(req.body);
    if (!user || !token) return res.status(404).json({ message });
    res.status(200).json({
      message,
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.profile = async (decode, req, res, next) => {
  try {
    const user = await userUseCase.getProfile(decode.userId);
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
