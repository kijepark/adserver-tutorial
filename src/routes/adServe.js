var express = require("express");
var moment = require("moment");

var Zone = require("./../controllers/zone");
var Placement = require("./../controllers/placement");
var Campaign = require("./../controllers/campaign");
var CampaignAssignment = require("./../controllers/campaignAssignment");
var AdItem = require("./../controllers/adItem");
var Report = require("./../controllers/report");

var router = express.Router();

// Provides ads to publishers
router.get("/adserve", async function(req, res) {
  try {
    var type = req.query.type;
    var zoneID = parseInt(req.query.zone_id);

    var zone = await Zone.retrieve({ id: zoneID });
    if (!zone) {
      return res.send("No Zone Found");
    }

    var placements = await Placement.list({ "zone.id": zone.id });
    if (!placements.length) {
      return res.send("No Placements Found");
    }

    // Usually each Placement have own their priorities
    // and get the most eligible placement for publisher's zone
    // but in this tutorial I didn't include kind of options
    // get random one instead
    var placement = placements[Math.floor(Math.random() * placements.length)];
    var placementID = placement.id;

    var campaign = await Campaign.retrieve({ id: placement.advertisement.id });
    if (!campaign) {
      return res.send("No Campaign Found");
    }
    var campaignID = campaign.id;

    var campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaignID });
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
    var adItemID = adItem.id;
    var response = null;

    // Tracking impressions
    var query = {
      "placement": placementID,
      "zone.id": zoneID,
      "campaign.id": campaignID,
      "ad_item.id": adItemID,
      "date": moment().format("YYYY-MM-DD")
    }
  
    // Checks if Report already exists
    var report = await Report.update(query, {
      $inc: { impressions: 1 }
    });
  
    // Creates one if not exists
    if (!report) {
      query.impressions = 1;
      await Report.create(query);
    }

    // Creates redirect url, like below
    // host/redirect?placement_id=${PlacementID}&zone_id=${ZoneID}&campaign_id=${CampaignID}&ad_item_id=${AdItemID}
    var host = req.protocol + '://' + req.get("host");
    var redirectURL = host+"/redirect?placement_id="+placementID+"&zone_id="+zoneID+"&campaign_id="+campaignID+"&ad_item_id="+adItemID;

    switch(type) {
      case "js": {
        response = '';
        response += 'document.write(\'<div style="display:inline-block;margin:0;padding:0;">\');';
        response += 'document.write(\'';
        response +=   '<a href="' + redirectURL + '" target="' + adItem.html_target + '" rel="nofollow">';
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
        response += '<a href="' + redirectURL + '" target="' + adItem.html_target + '" rel="nofollow">';
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
          redirect_url: redirectURL,
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

// Tracking clicks and Redirects them to redirect_url
router.get("/redirect", async function(req, res) {
  // Requires Placement ID, Zone ID, Campaign ID, Ad Item ID to track clicks
  // then redirect it to Ad Item link
  var placementID = parseInt(req.query.placement_id);
  var zoneID = parseInt(req.query.zone_id);
  var campaignID = parseInt(req.query.campaign_id);
  var adItemID = parseInt(req.query.ad_item_id);

  var adItem = await AdItem.retrieve({ id: adItemID });
  if (!adItem) {
    return res.send("No Ad Item Found");
  }

  // Tracking clicks
  var query = {
    "placement": placementID,
    "zone.id": zoneID,
    "campaign.id": campaignID,
    "ad_item.id": adItemID,
    "date": moment().format("YYYY-MM-DD")
  }

  // Checks if Report already exists
  var report = await Report.update(query, {
    $inc: { clicks: 1 }
  });

  // Creates one if not exists
  if (!report) {
    query.clicks = 1;
    await Report.create(query);
  }

  return res.redirect(adItem.location);
});

module.exports = router;
