/*----built-in pkgs----*/
const path = require("path");

/*----third-party pkgs----*/
const express = require("express");

/*----our own file----*/
const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

app.set("views", path.join(__dirname, "views")); //where to find template files
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

/*----without ejs----*/
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

/*----with ejs----*/
// app.get("/", function (req, res) {
//   res.render("index"); //no need to put file extention or path thanks to line6&7
// });

// app.get("/about", function (req, res) {
//   res.render("about");
// });

// app.get("/confirm", function (req, res) {
//   res.render("confirm");
// });

// app.get("/recommend", function (req, res) {
//   res.render("recommend");
// });

// app.post("/recommend", function (req, res) {
//   const restaurant = req.body;
//   restaurant.id = uuid.v4();

//   const storedRestaurants = resData.getStoredRestaurants();
//   storedRestaurants.push(restaurant);
//   resData.storeRestaurants(storedRestaurants);
//   res.redirect("/confirm");
// });

// app.get("/restaurants", function (req, res) {
//   const storedRestaurants = resData.getStoredRestaurants();
//   res.render("restaurants", {
//     numOfRes: storedRestaurants.length,
//     restaurants: storedRestaurants,
//   });
// });

// app.get("/restaurants/:restaurantid", function (req, res) {
//   const restaurantId = req.params.restaurantid;
//   const storedRestaurants = resData.getStoredRestaurants();
//   for (const restaurant of storedRestaurants) {
//     if (restaurant.id === restaurantId) {
//       return res.render("restaurant-detail", { restaurant: restaurant });
//     }
//   }
//   res.status(404).render("404"); // could return as well but not necessary
// });

app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
