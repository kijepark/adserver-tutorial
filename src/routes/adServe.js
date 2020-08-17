var express = require("express");

var Zone = require("./../controllers/zone");
var Placement = require("./../controllers/placement");
var Campaign = require("./../controllers/campaign");
var CampaignAssignment = require("./../controllers/campaignAssignment");
var AdItem = require("./../controllers/adItem");

var router = express.Router();

router.get("/adserve", async function(req, res) {
  try {
    var type = req.query.type;
    var zoneID = req.query.zone_id;

    var zone = await Zone.retrieve({ id: zoneID });
    if (!zone) {
      return res.send("No Zone found");
    }

    var placements = await Placement.list({ "zone.id": zone.id });
    if (!placements.length) {
      return res.send("No Placements found");
    }

    // Usually each Placement have own their priorities
    // and get the most eligible placement for publisher's zone
    // but in this tutorial I didn't include kind of options
    // get random one instead
    var placement = placements[Math.floor(Math.random() * placements.length)];

    var campaign = await Campaign.retrieve({ id: placement.advertisement.id });
    if (!campaign) {
      return res.send("No Campaign Found");
    }

    var campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaign.id });
    var adItems = [];

    for (var i=0; i<campaignAssignments.length; i+=1) {
      var campaignAssignment = campaignAssignments[i];
      var adItem = await AdItem.retrieve({ id: campaignAssignment.advertisement.id });

      // Push only ad that has same dimension with Zone's
      if (zone.width === adItem.width && zone.height === adItem.height) {
        adItems.push(adItem);
      }
    }

    // Also need to figure out the most eligible one but
    // use Random() instead
    var adItem = adItems[Math.floor(Math.random() * adItems.length)];
    var response = null;

    switch(type) {
      case "js": {
        response = '';
        response += 'document.write(\'<div style="display:inline-block;margin:0;padding:0;">\');';
        response += 'document.write(\'';
        response +=   '<a href="' + adItem.location + '" target="' + adItem.html_target + '" rel="nofollow">';
        response +=   '<img src="' + adItem.creative_url + '" border="0" width="' + adItem.width + '" height="' + adItem.height + '">';
        response +=   '</a>';
        response += '\');';
        response += 'document.write(\'</div>\');';

        res.setHeader("Content-Type", "text/plain");
        res.end(response);
        return;
      }
      case "iframe": {
        response = '';
        response += '<a href="' + adItem.location + '" target="' + adItem.html_target + '" rel="nofollow">';
        response += '<img src="' + adItem.creative_url + '" border="0" width="' + adItem.width + '" height="' + adItem.height + '">';
        response += '</a>';

        res.send(response);
        return;
      }
      case "json": {
        response = {
          width: adItem.width,
          height: adItem.height,
          target: adItem.html_target,
          redirect_url: adItem.location,
          image_url: adItem.creative_url
        }

        res.send(response);
        return;
      }
    }

    return res.send("Unknown Ad type");
  }catch(error) {
    return res.send(error);
  }
});

module.exports = router;
