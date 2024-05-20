const express = require("express");
const cors = require("cors");

const app = express();

// use middleware to form our contract for incoming json payload ONLY!!!
app.use(express.json());
// use middleware for url encoding
app.use(
  express.urlencoded({
    extended: true,
  })
);
// use middleware to handle cors policy
app.use(cors());

// health point or actuator
// http://localhost:3001
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "SERVICE IS UP 🚀" });
});

// routers
// app.use('/register')

// bad url or error we can handle with error handler middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500,
    message = error.message || "Internal Server Error ☠️";
  res.status(statusCode).json({ error: { message, statusCode } });
});

module.exports = app;
