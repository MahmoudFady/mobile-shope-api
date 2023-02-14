const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
module.exports = () => {
  mongoose.connect(
    DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) console.log(err.message);
      else console.log("connected to db...");
    }
  );
};
