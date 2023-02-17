const productDbAccess = require("../db-access/product");
const fileHelper = require("../helpers/file");
const productHelper = require("../helpers/product");
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
  const minPrice = +query.minPrice || 1;
  const maxPrice = +query.maxPrice || 10000;
  const taregtReqExp = new RegExp(target, "i");
  const searchCriteria = productHelper.getSearchCriteria(taregtReqExp, {
    minPrice,
    maxPrice,
  });
  return productDbAccess.getBySearch(searchCriteria);
};
module.exports.getByCategory = (category) =>
  productDbAccess.getByCategory(category);
module.exports.deleteOneById = (id) => productDbAccess.deleteOneById(id);
module.exports.updateOneById = (req) => {
  const { id } = req.params;
  const { updatedData } = req.body;
  return productDbAccess.updateOneById(id, updatedData);
};
