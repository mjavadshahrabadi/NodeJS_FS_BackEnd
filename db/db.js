const mongoose = require("mongoose");
const User = require("../models/userModel");

require("dotenv").config();

const connect = async () => {
  return await mongoose.connect(process.env.MONGO_DB);
};

const disconnect = async () => {
  return await mongoose.disconnect();
};

// obj: { email: req.body.email}
const findUser = async (obj) => {
  return User.findOne(obj).exec();
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
