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

router.post("/campaign/create", async function(req, res) {
  try {
    var advertiserID = req.body.advertiser_id;
    var { name } = req.body;

    await Campaign.create({
      advertiser: advertiserID,
      name: name
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/campaign/delete", async function(req, res) {
  try {
    var campaignIDsToDelete = req.body.ids;

    for (var i=0; i<campaignIDsToDelete.length; i+=1) {
      // Find ad campaignAssignments related to the campaign and find ad items
      var campaignID = campaignIDsToDelete[i];
      var campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaignID });
      
      for (var t=0; t<campaignAssignments.length; t+=1) {
        var campaignAssignment = campaignAssignments[t];
        var adItemID = campaignAssignment.advertisement.id;

        await CampaignAssignment.delete({ "advertisement.id": adItemID });
        await AdItem.delete({ id: adItemID });
      }

      // Find placements related to the campaign and delete it all
      await Placement.delete({ "advertisement.id": campaignID });

      await Campaign.delete({ id: campaignID });
    }

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/campaign/zone/assign", async function(req, res) {
  try {
    var campaignID = parseInt(req.body.campaign_id);
    var campaign = await Campaign.retrieve({ id: campaignID });

    var campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaign.id });
    var adItemSizes = [];

    for (var i=0; i<campaignAssignments.length; i+=1) {
      var campaignAssignment = campaignAssignments[i];
      var adItem = await AdItem.retrieve({
        id: campaignAssignment.advertisement.id
      });
      
      adItemSizes.push({
        width: adItem.width,
        height: adItem.height
      });
    }

    var eligibleZones = [];
    var zones = await Zone.list({ });

    for (var i=0; i<zones.length; i+=1) {
      var zone = zones[i];

      for (var t=0; t<adItemSizes.length; t+=1) {
        var adItemSize = adItemSizes[t];

        if (zone.width === adItemSize.width && zone.height === adItemSize.height) {
          if (eligibleZones.indexOf(zone) == -1) {
            eligibleZones.push(zone);
          }
        }
      }
    }

    var response = [];
    for (var i=0; i<eligibleZones.length; i+=1) {
      var eligibleZone = eligibleZones[i];
      var publisher = await Publisher.retrieve({ id: eligibleZone.publisher });

      response.push({
        id: eligibleZone.id,
        name: eligibleZone.name,
        publisher: publisher.name,
        size: eligibleZone.width + "x" + eligibleZone.height
      });
    }

    return res.send(response);
  }catch(error) {
    return res.send(error);
  }
});

router.post("/campaign/zone/unassign", async function(req, res) {
  try {
    var zoneIDs = req.body.ids;
    var campaignID = req.body.campaign_id;

    for (var i=0; i<zoneIDs.length; i+=1) {
      var zoneID = parseInt(zoneIDs[i]);
      
      await Placement.delete({
        "zone.id": zoneID,
        "advertisement.id": campaignID
      });
    }

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

module.exports = router;
