const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views")); //where to find template files
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// app.get("/", function (req, res) {
//   const filePath = path.join(__dirname, "views", "index.html");
//   res.sendFile(filePath);
// });
// app.get("/about", function (req, res) {
//   const filePath = path.join(__dirname, "views", "about.html");
//   res.sendFile(filePath);
// });
// app.get("/confirm", function (req, res) {
//   const filePath = path.join(__dirname, "views", "confirm.html");
//   res.sendFile(filePath);
// });
// app.get("/recommend", function (req, res) {
//   const filePath = path.join(__dirname, "views", "recommend.html");
//   res.sendFile(filePath);
// });

app.get("/", function (req, res) {
  res.render("index"); //no need to put file extention or path thanks to line6&7
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numOfRes: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.listen(3000);
