var express = require("express");

var Publisher = require("./../controllers/publisher");
var Zone = require("./../controllers/zone");
var Advertiser = require("./../controllers/advertiser");

var router = express.Router();

router.get("/publisher/list", async function(req, res, next) {
  try {
    var publishersAndZones = await Publisher.listAndZones({ });
    var advertisersAndZones = await Advertiser.listAndCampaigns({ });

    return res.render("publisher/list", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  }catch(error) {
    return next(error);
  }
});

router.get("/publisher/view", async function(req, res, next) {
  try {
    var publishersAndZones = await Publisher.listAndZones({ });
    var advertisersAndZones = await Advertiser.listAndCampaigns({ });

    var publisherID = parseInt(req.query.publisher_id);
    var publisher = await Publisher.retrieve({ id: publisherID });
    var zones = await Zone.listAndPlacements({ publisher: publisherID });

    return res.render("publisher/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      publisher: publisher,
      zones: zones
    });
  }catch(error) {
    return next(error);
  }
});

router.post("/publisher/create", async function(req, res) {
  try {
    var { name, domain } = req.body;

    await Publisher.create({
      name: name,
      domain: domain
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

module.exports = router;
