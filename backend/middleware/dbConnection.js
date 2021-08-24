const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
const dbConnection = () => {
  mongoose.connect(
    DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("connected to db...");
      }
    }
  );
};
module.exports = dbConnection;
