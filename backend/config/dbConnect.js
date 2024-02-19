const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  mongoose
    .connect(process.env.DATABASE, {})
    .then(() => {
      console.log("Database Connected.");
    })
    .catch((error) => {
      console.log("DB CONNECTION ERROR", error);
    });
};

module.exports = connectDb;
