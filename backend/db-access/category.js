const Category = require("../model/category");
module.exports.getAll = () => {
  return Category.find();
};
module.exports.createOne = (name) => {
  return new Category({ name }).save();
};
module.exports.updateOne = (id, name) => {
  return Category.updateOne(
    { _id: id },
    {
      $set: {
        name,
      },
    }
  );
};
