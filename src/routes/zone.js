var express = require("express");

var Publisher = require("./../controllers/publisher");
var Zone = require("./../controllers/zone");
var Advertiser = require("./../controllers/advertiser");
var Placement = require("./../controllers/placement");
var Campaign = require("./../controllers/campaign");
var CampaignAssignment = require("./../controllers/campaignAssignment");
var AdItem = require("./../controllers/adItem");
var Report = require("./../controllers/report");

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

      // Add total impressions regarding Placement
      var reports = await Report.list({
        placement: placement.id,
        "campaign.id": campaign.id
      });

      var totalImpressions = 0;
      for (var t=0; t<reports.length; t+=1) {
        totalImpressions += reports[t].impressions;
      }
      campaign.total_impressions = totalImpressions;

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

router.post("/zone/create", async function(req, res) {
  try {
    var publisherID = req.body.publisher_id;
    var { name, size } = req.body;
    var width = size.split("x")[0];
    var height = size.split("x")[1];

    await Zone.create({
      publisher: publisherID,
      name: name,
      width: width,
      height: height
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/zone/campaign/assign", async function(req, res) {
  try {
    var zoneID = parseInt(req.body.zone_id);
    var zone = await Zone.retrieve({ id: zoneID });
    
    var campaigns = await Campaign.list({ });
    var response = [];

    for (var i=0; i<campaigns.length; i+=1) {
      var campaign = campaigns[i];
      campaign.eligible_ad_items = [];

      var campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaign.id });

      for (var t=0; t<campaignAssignments.length; t+=1) {
        var campaignAssignment = campaignAssignments[t];
        var adItems = await AdItem.list({
          id: campaignAssignment.advertisement.id
        });

        for (var z=0; z<adItems.length; z+=1) {
          var adItem = adItems[z];

          if (zone.width === adItem.width && zone.height === adItem.height) {
            campaign.eligible_ad_items.push(adItem);
          }
        }
      }
    }

    for (var i=0; i<campaigns.length; i+=1) {
      var campaign = campaigns[i];
      var advertiser = await Advertiser.retrieve({ id: campaign.advertiser });

      response.push({
        id: campaign.id,
        name: campaign.name,
        eligible_ad_items: campaign.eligible_ad_items.length,
        advertiser: advertiser.name
      });
    }

    return res.send(response);
  }catch(error) {
    return res.send(error);
  }
});

module.exports = router;
