const { findUser, saveUser } = require("../db/db");
const errorTemplate = require("../templates/errorTemplate");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const foundUser = await findUser({ email: req.body.email });
    if (foundUser) throw new Error("User exist, try logging in.");
    const user = new User();
    user._id = new mongoose.Types.ObjectId();
    const newUser = Object.assign(user, req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    newUser.password = hashedPassword;
    const savedUser = await saveUser(newUser);
    res
      .status(201)
      .json({ message: "Successful Registration.", user: savedUser });
  } catch (err) {
    return errorTemplate(res, err, err.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const loggedUser = await findUser({ email: req.body.email });
    if (!loggedUser)
      throw new Error("Authentication failed: Unable to find user!");
    else {
      const result = await bcrypt.compare(
        req.body.password,
        loggedUser.password
      );
      if (result) {
        const token = jwt.sign({ user: loggedUser }, process.env.JWT_SECRET);
        loggedUser.password = null;
        return res.status(201).json({
          logged: true,
          user: loggedUser,
          token,
          message: "Login Successful.",
        });
      } else {
        throw new Error(
          "Authentication failed: Email or Password dose not match!"
        );
      }
    }
  } catch (err) {
    return errorTemplate(res, err, err.message);
  }
};
