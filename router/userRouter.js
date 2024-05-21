const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { saveUser, findUser } = require("../db/db");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/register", (req, res, next) => {
  findUser({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        return res.status(409).json({ message: "User exist, try logging in." });
      } else {
        const user = new User();
        const newUser = Object.assign(user, {
          ...req.body,
          _id: new mongoose.Types.ObjectId(),
        });
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            return res.status(501).json({ message: "Error: " + err.message });
          } else {
            newUser.password = hash;
            const dbUser = await saveUser(newUser);
            res
              .status(201)
              .json({ message: "Successful Registration", user: dbUser });
          }
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
