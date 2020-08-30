import express from "express";

import Publisher from "./../controllers/publisher";
import Campaign from "./../controllers/campaign";
import CampaignAssignment from "./../controllers/campaignAssignment";
import AdItem from "./../controllers/adItem";
import Placement from "./../controllers/placement";
import Zone from "./../controllers/zone";
import Advertiser from "./../controllers/advertiser";
import Report from "./../controllers/report";

const router = express.Router();

router.get("/campaign/view", async(req, res, next) => {
  try {
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    const campaignID = parseInt(req.query.campaign_id);
    const campaign = await Campaign.retrieve({ id: campaignID });

    const campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaignID });
    const adItems = [];

    for (let i=0; i<campaignAssignments.length; i+=1) {
      const campaignAssignment = campaignAssignments[i];
      const adItem = await AdItem.retrieve({ id: campaignAssignment.advertisement.id });

      // Add total impressions and clicks regarding campaign
      const reports = await Report.list({
        "ad_item.id": adItem.id,
        "campaign.id": campaignID
      });

      let totalImpressions = 0;
      let clicks = 0;
      for (let t=0; t<reports.length; t+=1) {
        const report = reports[t];

        totalImpressions += report.impressions;
        clicks += report.clicks;
      }
      adItem.total_impressions = totalImpressions;
      adItem.clicks = clicks;

      adItems.push(adItem);
    }

    const placements = await Placement.list({ "advertisement.id": campaignID });
    const zones = [];
    
    for (let i=0; i<placements.length; i+=1) {
      const placement = placements[i];
      const zone = await Zone.retrieve({ id: placement.zone.id });

      // Add total impressions and clicks regarding Placement
      const reports = await Report.list({
        "placement": placement.id,
        "zone.id": zone.id
      });

      let totalImpressions = 0;
      for (let t=0; t<reports.length; t+=1) {
        const report = reports[t];

        totalImpressions += report.impressions;
      }
      zone.total_impressions = totalImpressions;

      zones.push(zone);
    }

    return res.render("campaign/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      campaign: campaign,
      ad_items: adItems,
      zones: zones
    });
  }catch(error) {
    return next(error);
  }
});

router.post("/campaign/create", async(req, res) => {
  try {
    const advertiserID = req.body.advertiser_id;
    const { name } = req.body;

    await Campaign.create({
      advertiser: advertiserID,
      name: name
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/campaign/delete", async(req, res) => {
  try {
    const campaignIDs = req.body.ids;

    for (let i=0; i<campaignIDs.length; i+=1) {
      // Find ad campaignAssignments related to the campaign and find ad items
      const campaignID = campaignIDs[i];
      const campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaignID });
      
      for (let t=0; t<campaignAssignments.length; t+=1) {
        const campaignAssignment = campaignAssignments[t];
        const adItemID = campaignAssignment.advertisement.id;

        await CampaignAssignment.delete({ "advertisement.id": adItemID });
        await AdItem.delete({ id: adItemID });
      }

      // Find placements related to the campaign and delete it all
      await Placement.delete({ "advertisement.id": campaignID });

      await Campaign.delete({ id: campaignID });
    }

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/campaign/zone/assign", async(req, res) => {
  try {
    const campaignID = parseInt(req.body.campaign_id);
    const campaign = await Campaign.retrieve({ id: campaignID });

    const campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaign.id });
    const adItemSizes = [];

    for (let i=0; i<campaignAssignments.length; i+=1) {
      const campaignAssignment = campaignAssignments[i];
      const adItem = await AdItem.retrieve({
        id: campaignAssignment.advertisement.id
      });
      
      adItemSizes.push({
        width: adItem.width,
        height: adItem.height
      });
    }

    const eligibleZones = [];
    const zones = await Zone.list({ });

    for (let i=0; i<zones.length; i+=1) {
      const zone = zones[i];

      for (let t=0; t<adItemSizes.length; t+=1) {
        const adItemSize = adItemSizes[t];

        if (zone.width === adItemSize.width && zone.height === adItemSize.height) {
          if (eligibleZones.indexOf(zone) == -1) {
            eligibleZones.push(zone);
          }
        }
      }
    }

    const response = [];
    for (let i=0; i<eligibleZones.length; i+=1) {
      const eligibleZone = eligibleZones[i];
      const publisher = await Publisher.retrieve({ id: eligibleZone.publisher });

      response.push({
        id: eligibleZone.id,
        name: eligibleZone.name,
        publisher: publisher.name,
        size: eligibleZone.width + "x" + eligibleZone.height
      });
    }

    return res.send(response);
  }catch(error) {
    return res.send(error);
  }
});

router.post("/campaign/zone/unassign", async(req, res) => {
  try {
    const zoneIDs = req.body.ids;
    const campaignID = req.body.campaign_id;

    for (let i=0; i<zoneIDs.length; i+=1) {
      const zoneID = parseInt(zoneIDs[i]);
      
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

export default router;
