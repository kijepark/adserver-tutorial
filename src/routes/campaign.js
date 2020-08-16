var express = require("express");

var Publisher = require("./../controllers/publisher");
var Advertiser = require("./../controllers/advertiser");

var router = express.Router();

router.get("/campaign/view", async function(req, res, next) {
  try {
    var publishersAndZones = await Publisher.listAndZones({ });
    var advertisersAndZones = await Advertiser.listAndCampaigns({ });

    return res.render("campaign/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  }catch(error) {
    return next(error);
  }
});

module.exports = router;
