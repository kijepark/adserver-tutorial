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
    return res.send(error);
  }
});

router.post("/placement/delete", async function(req, res) {
  try {
    var campaignIDs = req.body.ids;
    var zoneID = req.body.zone_id;

    for (var i=0; i<campaignIDs.length; i+=1) {
      var campaignID = parseInt(campaignIDs[i]);
      
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
