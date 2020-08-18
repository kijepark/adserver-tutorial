var express = require("express");

var Publisher = require("./../controllers/publisher");
var Advertiser = require("./../controllers/advertiser");
var Campaign = require("./../controllers/campaign");

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

module.exports = router;
