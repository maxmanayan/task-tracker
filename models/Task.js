// imports
const mongoose = require("mongoose");

// schema
const taskSchema = new mongoose.Schema(
  {
    text: String,
    day: String,
    reminder: Boolean,
  },
  {
    collection: "tasks",
  }
);

// model export
module.exports = mongoose.model("Task", taskSchema);
