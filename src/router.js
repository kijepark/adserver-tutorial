var express = require("express");

var dashboardRoute = require("./routes/dashboard");
var publisherRoute = require("./routes/publisher");
var zoneRoute = require("./routes/zone");
var advertiserRoute = require("./routes/advertiser");
var campaignRoute = require("./routes/campaign");

var router = express.Router();

router.use(dashboardRoute);
router.use(publisherRoute);
router.use(zoneRoute);
router.use(advertiserRoute);
router.use(campaignRoute);

module.exports = router;
