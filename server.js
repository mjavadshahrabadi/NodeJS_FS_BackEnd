const http = require("http");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    res.write("javad shahrabadi");
    res.end();
  })
  .listen(PORT, () => console.log(`Server is runing on port: %d`, PORT));
