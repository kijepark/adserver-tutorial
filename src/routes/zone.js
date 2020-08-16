var express = require("express");

var Publisher = require("./../controllers/publisher");
var Zone = require("./../controllers/zone");
var Advertiser = require("./../controllers/advertiser");
var Placement = require("./../controllers/placement");
var Campaign = require("./../controllers/campaign");

var router = express.Router();

router.get("/zone/view", async function(req, res, next) {
  try {
    var publishersAndZones = await Publisher.listAndZones({ });
    var advertisersAndZones = await Advertiser.listAndCampaigns({ });

    var zoneID = parseInt(req.query.zone_id);
    var zone = await Zone.retrieve({ id: zoneID });
    var placements = await Placement.list({ "zone.id": zone.id });
    var assignedCampaigns = [];
    
    for (var i=0; i<placements.length; i+=1) {
      var placement = placements[i];
      var campaign = await Campaign.retrieve({ id: placement.advertisement.id });

      assignedCampaigns.push(campaign);
    }

    return res.render("zone/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      zone: zone,
      assigned_campaigns: assignedCampaigns
    });
  }catch(error) {
    return next(error);
  }
});

module.exports = router;
