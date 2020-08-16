var express = require("express");

var Publisher = require("./../controllers/publisher");
var Zone = require("./../controllers/zone");
var Advertiser = require("./../controllers/advertiser");
var Campaign = require("./../controllers/campaign");

var router = express.Router();

router.get("/", async function(req, res, next) {
  try {
    var publishers = await Publisher.list({ });

    for (var i=0; i<publishers.length; i+=1) {
      var publisher = publishers[i];
      var publisherID = publisher.id;

      var zones = await Zone.list({ publisher: publisherID });
      publisher.zones = zones;
    }

    var advertisers = await Advertiser.list({ });

    for (var i=0; i<advertisers.length; i+=1) {
      var advertiser = advertisers[i];
      var advertiserID = advertiser.id;

      var campaigns = await Campaign.list({ advertiser: advertiserID });
      advertiser.campaigns = campaigns;
    }

    return res.render("dashboard", {
      publishers: publishers,
      advertisers: advertisers
    });
  }catch(error) {
    return next(error);
  }
});

module.exports = router;
