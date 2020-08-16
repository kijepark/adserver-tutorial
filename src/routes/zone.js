var express = require("express");

var router = express.Router();

router.get("/zone/view", function(req, res, next) {
  res.render("zone/view");
});

module.exports = router;
