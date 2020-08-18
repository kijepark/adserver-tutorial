var express = require("express");

var Publisher = require("./../controllers/publisher");
var Campaign = require("./../controllers/campaign");
var CampaignAssignment = require("./../controllers/campaignAssignment");
var AdItem = require("./../controllers/adItem");
var Placement = require("./../controllers/placement");
var Zone = require("./../controllers/zone");
var Advertiser = require("./../controllers/advertiser");
var Report = require("./../controllers/report");

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

      // Add total impressions and clicks regarding campaign
      var reports = await Report.list({
        "ad_item.id": adItem.id,
        "campaign.id": campaignID
      });

      var totalImpressions = 0;
      var clicks = 0;
      for (var t=0; t<reports.length; t+=1) {
        var report = reports[t];

        totalImpressions += report.impressions;
        clicks += report.clicks;
      }
      adItem.total_impressions = totalImpressions;
      adItem.clicks = clicks;

      adItems.push(adItem);
    }

    var placements = await Placement.list({ "advertisement.id": campaignID });
    var zones = [];
    
    for (var i=0; i<placements.length; i+=1) {
      var placement = placements[i];
      var zone = await Zone.retrieve({ id: placement.zone.id });

      // Add total impressions and clicks regarding Placement
      var reports = await Report.list({
        "placement": placement.id,
        "zone.id": zone.id
      });

      var totalImpressions = 0;
      for (var t=0; t<reports.length; t+=1) {
        var report = reports[t];

        totalImpressions += report.impressions;
      }
      zone.total_impressions = totalImpressions;

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
