// imports
const mongoose = require("mongoose");

// schema
const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    day: {
      type: String,
    },
    reminder: {
      type: Boolean,
    },
  },
  {
    collection: "tasks",
  }
);

// model export
module.exports = mongoose.model("Task", taskSchema);
