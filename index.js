const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("This is my network association");
});

app.get("/greeting", (req, res) => {
  res.send("Welcome to my community!");
});

app.listen(5000, () => {
  console.log("listening");
});