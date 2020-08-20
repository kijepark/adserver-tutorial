var express = require("express");

var AdItem = require("./../controllers/adItem");
var CampaignAssignment = require("./../controllers/campaignAssignment");

var router = express.Router();

router.post("/aditem/create", async function(req, res) {
  try {
    var campaignID = req.body.campaign_id;
    var name = req.body.name;
    var location = req.body.link;
    var creativeUrl = req.body.image_url;
    var size = req.body.size;
    var width = size.split("x")[0];
    var height = size.split("x")[1];
    var htmlTarget = req.body.html_target;

    var adItem = await AdItem.create({
      name: name,
      location: location,
      creative_url: creativeUrl,
      width: width,
      height: height,
      html_target: htmlTarget
    });

    await CampaignAssignment.create({
      "advertisement.id": adItem.id,
      "campaign.id": campaignID
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

module.exports = router;
