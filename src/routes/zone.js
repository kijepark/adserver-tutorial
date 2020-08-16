var express = require("express");

var Publisher = require("./../controllers/publisher");
var Zone = require("./../controllers/zone");
var Advertiser = require("./../controllers/advertiser");

var router = express.Router();

router.get("/zone/view", async function(req, res, next) {
  try {
    var publishersAndZones = await Publisher.listAndZones({ });
    var advertisersAndZones = await Advertiser.listAndCampaigns({ });

    var zoneID = parseInt(req.query.zone_id);
    var zone = await Zone.retrieve({ id: zoneID });

    return res.render("zone/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      zone: zone
    });
  }catch(error) {
    return next(error);
  }
});

module.exports = router;
