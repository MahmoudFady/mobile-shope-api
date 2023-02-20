const categoryDbAccess = require("../db-access/category");
module.exports.getAll = () => categoryDbAccess.getAll();
module.exports.createOne = (name) => categoryDbAccess.createOne(name);
module.exports.updateOne = (id, name) => categoryDbAccess.updateOne(id, name);
