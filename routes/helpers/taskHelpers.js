const Task = require("../../models/Task");
const { err400 } = require("./customErrors");

const findTask = async (req, res, next) => {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (!task) {
      next(err400);
    }
  } catch (error) {
    next(new Error(error.message));
  }
  res.task = task;
  next();
};

const validateNewTask = (reqObj) => {
  console.log("in validateNewTask", reqObj);
  if (
    typeof reqObj.text !== "string" ||
    typeof reqObj.day !== "string" ||
    typeof reqObj.reminder !== "boolean"
  ) {
    console.log("property wrong");
    return false;
  } else {
    console.log("property right");
    return true;
  }
};

module.exports = { findTask, validateNewTask };
