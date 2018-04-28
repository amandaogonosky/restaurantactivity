const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 8080;
let currentReservations = [];
let waitingList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "main.html"));
  });
  app.get("/api/tables", function(req, res) {
    return res.json(currentReservations);
  });
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  app.get("/api/waitlist", function(req, res) {
    return res.json(waitingList);
  });
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
  });
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
