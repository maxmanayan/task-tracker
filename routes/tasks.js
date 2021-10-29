// imports
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const {
  checkProperties,
  findTask,
  validateNewTask,
} = require("./helpers/taskHelpers");
const { err400 } = require("./helpers/customErrors");

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
router.get("/task/:id", findTask, (req, res, next) => {
  res.status(200).send(res.task);
});

// GET QUERY
router.get("/task", async (req, res, next) => {
  try {
    console.log(req.query);
    const queriedTasks = await Task.find(req.query);
    console.log("queriedTasks", queriedTasks);
    if (queriedTasks.length < 1) {
      next();
    } else {
      res.status(200).send(queriedTasks);
    }
  } catch (error) {
    next(new Error(error.message));
  }
});

// POST
router.post("/task", async (req, res, next) => {
  try {
    if (validateNewTask(req.body)) {
      console.log("task valid");
      const task = new Task({
        text: req.body.text,
        day: req.body.day,
        reminder: req.body.reminder,
      });
      const newTask = await task.save();
      res.status(201).send(newTask);
    } else {
      console.log("task invalid");
      next(err400);
    }
  } catch (error) {
    next(new Error(error.message));
  }
});

// PUT
router.put("/task/:id", findTask, async (req, res, next) => {
  try {
    if (checkProperties(req.body)) {
      res.task.text = req.body.text;
      res.task.day = req.body.day;
      res.task.reminder = req.body.reminder;
      const updatedTask = await res.task.save();
      res.status(200).send(updatedTask);
    } else {
      next(err400);
    }
  } catch (error) {
    next(new Error(error.message));
  }
});

// DELETE
router.delete("/task/:id", findTask, async (req, res, next) => {
  try {
    await res.task.remove();
    res.status(200).send({ message: "Task successfully deleted" });
  } catch (error) {
    next(new Error(error.message));
  }
});

// exports
module.exports = router;
