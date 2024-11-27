require("dotenv").config();
const express = require("express");
const app = express();
const schoolRouter = require("./routes/school");
const initializeDatabase = require("./db/dbsetup");

app.use(express.json());

// base route
app.get("/", (req, res) => {
  return res.status(200).json("Base route");
});

// Ensure database and tables exist
initializeDatabase();

// routes
app.use("/schoolDB", schoolRouter);

// all other invalid routes
app.get("/*", (req, res) => {
  return res.status(404).json("Invalid route");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
