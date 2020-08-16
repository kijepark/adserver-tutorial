var express = require("express");

var Publisher = require("./../controllers/publisher");
var Campaign = require("./../controllers/campaign");
var Advertiser = require("./../controllers/advertiser");

var router = express.Router();

router.get("/campaign/view", async function(req, res, next) {
  try {
    var publishersAndZones = await Publisher.listAndZones({ });
    var advertisersAndZones = await Advertiser.listAndCampaigns({ });

    var campaignID = parseInt(req.query.campaign_id);
    var campaign = await Campaign.retrieve({ id: campaignID });

    return res.render("campaign/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      campaign: campaign
    });
  }catch(error) {
    return next(error);
  }
});

module.exports = router;
