const Task = require("../../models/Task");
const { err400 } = require("./customErrors");

export const findTask = async (req, res, next) => {
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
