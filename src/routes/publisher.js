var express = require("express");

var router = express.Router();

router.get("/publisher/list", function(req, res, next) {
  res.render("publisher/list");
});

router.get("/publisher/view", function(req, res, next) {
  res.render("publisher/view");
});

module.exports = router;
