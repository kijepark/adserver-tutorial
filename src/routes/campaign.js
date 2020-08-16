var express = require("express");

var router = express.Router();

router.get("/campaign/view", function(req, res, next) {
  res.render("campaign/view");
});

module.exports = router;
