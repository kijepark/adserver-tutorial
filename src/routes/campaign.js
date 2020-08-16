var express = require("express");

var Publisher = require("./../controllers/publisher");
var Campaign = require("./../controllers/campaign");
var CampaignAssignment = require("./../controllers/campaignAssignment");
var AdItem = require("./../controllers/adItem");
var Placement = require("./../controllers/placement");
var Zone = require("./../controllers/zone");
var Advertiser = require("./../controllers/advertiser");

var router = express.Router();

router.get("/campaign/view", async function(req, res, next) {
  try {
    var publishersAndZones = await Publisher.listAndZones({ });
    var advertisersAndZones = await Advertiser.listAndCampaigns({ });

    var campaignID = parseInt(req.query.campaign_id);
    var campaign = await Campaign.retrieve({ id: campaignID });

    var campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaignID });
    var adItems = [];

    for (var i=0; i<campaignAssignments.length; i+=1) {
      var campaignAssignment = campaignAssignments[i];
      var adItem = await AdItem.retrieve({ id: campaignAssignment.advertisement.id });

      adItems.push(adItem);
    }

    var placements = await Placement.list({ "advertisement.id": campaignID });
    var zones = [];
    
    for (var i=0; i<placements.length; i+=1) {
      var placement = placements[i];
      var zone = await Zone.retrieve({ id: placement.zone.id });

      zones.push(zone);
    }

    return res.render("campaign/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      campaign: campaign,
      ad_items: adItems,
      zones: zones
    });
  }catch(error) {
    return next(error);
  }
});

module.exports = router;
