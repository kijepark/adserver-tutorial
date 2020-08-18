var express = require("express");

var Placement = require("./../controllers/placement");

var router = express.Router();

router.post("/placement/create", async function(req, res) {
  try {
    var zoneID = parseInt(req.body.zone_id);
    var campaignID = parseInt(req.body.campaign_id);

    await Placement.create({
      "zone.id": zoneID,
      "advertisement.id": campaignID
    });

    return res.send();
  }catch(error) {
    return next(error);
  }
});

module.exports = router;
