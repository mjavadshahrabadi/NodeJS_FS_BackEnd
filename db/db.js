const mongoose = require("mongoose");
const User = require("../models/userModel");

require("dotenv").config();

const connect = async () => {
  return await mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Database Connected."))
    .catch((error) =>
      console.log("Failed Database Connection! ", error.message)
    );
};

const disconnect = async () => {
  return await mongoose
    .disconnect()
    .then("Database Disconnect.")
    .catch((error) =>
      console.log("Database Disconnection Failed! ", error.message)
    );
};

// obj: { email: req.body.email}
const findUser = async (obj) => {
  return await User.findOne(obj);
};

const saveUser = async (newUser) => {
  return await newUser.save();
};

module.exports = {
  connect,
  disconnect,
  saveUser,
  findUser,
};
