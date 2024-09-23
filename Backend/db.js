const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURL = process.env.MONGO_LOCAL_URL;
const mongoURL = process.env.MONGO_URL;

const mongodb = mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to MongoDB server");
});

db.on("error", (error) => {
  console.log("some error in MongoDB", error);
});

db.on("disconnected", () => {
  console.log("MongoDB server diconnected");
});

module.exports = db;
