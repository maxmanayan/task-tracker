// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const tasksRouter = require("./routes/tasks");

// constants
const app = express();
const PORT = 3001;

// mongoose middleware
mongoose.connect(process.env.LOCAL_DB);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("MongoDB connected..."));

// APIs and middleware
app.use(morgan("dev"));
app.use(express.json());
app.use("/tasks", tasksRouter);

// routes
app.get("/", (req, res, next) => {
  res.status(200).send("Task Tracker");
});

// error handlers
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("in Default Error Handler");
  res.status(err.status || 500);
  const error = {
    error: {
      status: err.status || 500,
      message: err.message,
    },
  };
  console.log(error);
  res.send(error);
});

// exports
module.exports = app.listen(PORT, () => {
  console.log(`Task Tracker listening on http://localhost:${PORT}`);
});
