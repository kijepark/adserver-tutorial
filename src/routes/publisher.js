var express = require("express");

var Publisher = require("./../controllers/publisher");
var Zone = require("./../controllers/zone");
var Placement = require("./../controllers/placement");
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

router.post("/publisher/delete", async function(req, res) {
  try {
    var publisherIDsToDelete = req.body.ids;

    for (var i=0; i<publisherIDsToDelete.length; i+=1) {
      var publisherID = publisherIDsToDelete[i];
      
      // Find zones related to the publisher and delete it all
      var zones = await Zone.list({ publisher: publisherID });

      // Find placements related to the zone and delete it all
      for (var t=0; t<zones.length; t+=1) {
        var zoneID = zones[t].id;

        await Placement.delete({ "zone.id": zoneID });
        await Zone.delete({ id: zoneID });
      }

      // Delete a publisher
      await Publisher.delete({ id: publisherID });
    }

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

module.exports = router;
