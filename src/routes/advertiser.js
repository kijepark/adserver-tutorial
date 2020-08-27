var express = require("express");

var Publisher = require("./../controllers/publisher");
var Advertiser = require("./../controllers/advertiser");
var Campaign = require("./../controllers/campaign");
var CampaignAssignment = require("./../controllers/campaignAssignment");
var AdItem = require("./../controllers/adItem");
var Placement = require("./../controllers/placement");

var router = express.Router();

router.get("/advertiser/list", async function(req, res, next) {
  try {
    var publishersAndZones = await Publisher.listAndZones({ });
    var advertisersAndZones = await Advertiser.listAndCampaigns({ });

    return res.render("advertiser/list", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  }catch(error) {
    return next(error);
  }
});

router.get("/advertiser/view", async function(req, res, next) {
  try {
    var publishersAndZones = await Publisher.listAndZones({ });
    var advertisersAndZones = await Advertiser.listAndCampaigns({ });

    var advertiserID = parseInt(req.query.advertiser_id);
    var advertiser = await Advertiser.retrieve({ id: advertiserID });
    var campaigns = await Campaign.listAndCampaignAssignments({ advertiser: advertiserID });

    return res.render("advertiser/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      advertiser: advertiser,
      campaigns: campaigns
    });
  }catch(error) {
    return next(error);
  }
});

router.post("/advertiser/create", async function(req, res) {
  try {
    var { name } = req.body;

    await Advertiser.create({
      name: name
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/advertiser/delete", async function(req, res) {
  try {
    var advertiserIDsToDelete = req.body.ids;

    for (var i=0; i<advertiserIDsToDelete.length; i+=1) {
      var advertiserID = advertiserIDsToDelete[i];
      var campaigns = await Campaign.list({ advertiser: advertiserID });

      for (var c=0; c<campaigns.length; c+=1) {
        var campaignID = campaigns[c].id;
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

      await Advertiser.delete({ id: advertiserID });
    }

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

module.exports = router;
