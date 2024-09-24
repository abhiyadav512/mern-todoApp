const express = require("express");
const db = require("./db");
require("dotenv").config();
const todoRouter = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const app = express();
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/todos", todoRouter);

// deployement ----
const __dirname1 = path.resolve();
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname1, "/Frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname1, "Frontend", "build", "static", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to my API");
  });
}
// -----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
