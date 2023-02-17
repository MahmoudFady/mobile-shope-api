const commentUseCase = require("../../use-case/comment");
module.exports.create = async (decode, req, res, next) => {
  try {
    const { productId } = req.params;
    const commentData = {
      creator: decode.userId,
      content: req.body.content,
    };
    const newComment = await commentUseCase.create(productId, commentData);
    res.status(200).json({ message: "comment created", newComment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
