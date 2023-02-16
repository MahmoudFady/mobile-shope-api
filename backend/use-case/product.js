const productDbAccess = require("../db-access/product");
const fileHelper = require("../helpers/file");
module.exports.create = (req) => {
  let {
    category,
    brand,
    model,
    thumbnail,
    images,
    describtion,
    price,
    discount,
    count,
    details,
  } = req.body;
  thumbnail = fileHelper.getSingleUploadFilePath(req);
  images = fileHelper.getMultiUploadFilesPath(req);
  console.log(thumbnail);
  console.log(images);
  data = {
    category,
    brand,
    model,
    thumbnail,
    images,
    describtion,
    price,
    discount,
    count,
    details,
  };
  return productDbAccess.create(data);
};
module.exports.getOneById = (id) => {
  return productDbAccess.getOneById(id);
};
module.exports.getByPagination = async (query) => {
  const pageIndex = +query["pageIndex"] || 1;
  const limit = +query["limit"] || 5;
  const skip = (pageIndex - 1) * limit;
  const { productCount, products } = await productDbAccess.getByPagination(
    skip,
    limit
  );
  const maxPageIndex = Math.ceil(productCount / limit);
  return { productCount, maxPageIndex, products };
};
module.exports.getBySearch = (query) => {
  const target = query.target;
  const taregtReqExp = new RegExp(target, "i");
  return productDbAccess.getBySearch(taregtReqExp);
};
module.exports.getByCategory = (category) => {
  return productDbAccess.getByCategory(category);
};
