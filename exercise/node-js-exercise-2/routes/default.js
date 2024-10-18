const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index"); //no need to put file extention or path thanks to line6&7
});

router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router;
