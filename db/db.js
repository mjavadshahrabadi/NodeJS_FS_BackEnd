const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  return await mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Database Connected."))
    .catch((error) =>
      console.log("Failed Database Connection! ", error.message)
    );
};

module.exports = {
  connect,
};
