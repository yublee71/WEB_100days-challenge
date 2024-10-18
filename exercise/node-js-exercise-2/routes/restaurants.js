const express = require("express");
const uuid = require("uuid");
const resData = require("../util/restaurant-data");

const router = express.Router();

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  const storedRestaurants = resData.getStoredRestaurants();
  storedRestaurants.push(restaurant);
  resData.storeRestaurants(storedRestaurants);
  res.redirect("/confirm");
});

router.get("/restaurants", function (req, res) {
  const storedRestaurants = resData.getStoredRestaurants();
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") order = "asc";
  if (order === "desc") nextOrder = "asc";

  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    )
      return 1;
    return -1;
  });
  res.render("restaurants", {
    numOfRes: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

router.get("/restaurants/:restaurantid", function (req, res) {
  const restaurantId = req.params.restaurantid;
  const storedRestaurants = resData.getStoredRestaurants();
  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  res.status(404).render("404"); // could return as well but not necessary
});

module.exports = router;
