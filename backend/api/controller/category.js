const categorySchema = require("../../use-case/category");
module.exports.getAll = async (req, res, next) => {
  try {
    const categories = await categorySchema.getAll();
    res.status(200).json({ message: "get all categories", categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.createOne = async (req, res, next) => {
  try {
    const category = await categorySchema.createOne(req.body.name);
    res.status(200).json({ message: "create new category", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.updateOne = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const name = req.body.name;
    const category = await categorySchema.updateOne(categoryId, name);
    res.status(200).json({ message: "update category", category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
