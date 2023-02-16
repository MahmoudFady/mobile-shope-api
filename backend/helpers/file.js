const { getServerBaseUrl } = require("../config/keys");
module.exports.getSingleUploadFilePath = (req) =>
  getServerBaseUrl(req.protocol, req.get("host")).concat(
    "uploads/",
    req.files["thumbnail"][0].filename
  );
module.exports.getMultiUploadFilesPath = (req) =>
  req.files["images"].map((file) =>
    getServerBaseUrl(req.protocol, req.get("host")).concat(
      "uploads/",
      file.filename
    )
  );
