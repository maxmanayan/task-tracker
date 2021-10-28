// imports
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// routes
// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    next(new Error(error.message));
  }
});

// GET ONE
// GET QUERY
// POST
// PUT
// DELETE

// exports
module.exports = router;
