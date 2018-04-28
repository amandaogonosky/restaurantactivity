const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 8080;
let currentReservations = [];
let waitingList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "main.html"));
});
app.get("/api/tables", function (req, res) {
    return res.json(currentReservations);
});
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitingList);
});
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "table.html"));
});
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
app.post("/api/waitlist", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  let newWaitlist = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();

  console.log(newWaitlist);

  waitingList.push(newWaitlist);

  res.json(newWaitlist);
});
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  let newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
  if (currentReservations.length <= 4) {
    currentReservations.push(newReservation);
  } else if (currentReservations.length > 4) {
    waitingList.push(newReservation);
  }



  res.json(newReservation);
});