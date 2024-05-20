const express = require("express");

const router = express.Router();

// GET http://localhost:3001/users
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Successful - GET",
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// GET http://localhost:3001/users/34
router.get("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Successful - GET BY ID",
    metadata: {
      id: req.params.id,
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// POST http://localhost:3001/users
router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Successful - POST",
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// PUT http://localhost:3001/users/34
router.put("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Successful - PUT BY ID",
    metadata: {
      id: req.params.id,
      hostname: req.hostname,
      method: req.method,
    },
  });
});

// DELETE http://localhost:3001/users/34
router.delete("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Successful - DELETE BY ID",
    metadata: {
      id: req.params.id,
      hostname: req.hostname,
      method: req.method,
    },
  });
});

module.exports = router;
