var express = require("express");

var router = express.Router();

router.get("/advertiser/list", function(req, res, next) {
  res.render("advertiser/list");
});

router.get("/advertiser/view", function(req, res, next) {
  res.render("advertiser/view");
});

module.exports = router;
