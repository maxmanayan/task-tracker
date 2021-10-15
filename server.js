// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// constants
const app = express();
const PORT = 3001;

// mongoose middleware

// APIs and middleware
app.use(morgan("dev"));
app.use(express.json());

// routes

// error handlers

// exports
