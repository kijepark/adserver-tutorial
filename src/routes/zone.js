import express from "express";

import Publisher from "./../controllers/publisher";
import Zone from "./../controllers/zone";
import Advertiser from "./../controllers/advertiser";
import Placement from "./../controllers/placement";
import Campaign from "./../controllers/campaign";
import CampaignAssignment from "./../controllers/campaignAssignment";
import AdItem from "./../controllers/adItem";
import Report from "./../controllers/report";

const router = express.Router();

router.get("/zone/view", async(req, res, next) => {
  try {
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    const zoneID = parseInt(req.query.zone_id);
    const zone = await Zone.retrieve({ id: zoneID });
    const placements = await Placement.list({ "zone.id": zone.id });
    const assignedCampaigns = [];
    
    for (let i=0; i<placements.length; i+=1) {
      const placement = placements[i];
      const campaign = await Campaign.retrieve({ id: placement.advertisement.id });

      // Add total impressions regarding Placement
      const reports = await Report.list({
        placement: placement.id,
        "campaign.id": campaign.id
      });

      let totalImpressions = 0;
      for (let t=0; t<reports.length; t+=1) {
        totalImpressions += reports[t].impressions;
      }
      campaign.total_impressions = totalImpressions;

      assignedCampaigns.push(campaign);
    }

    return res.render("zone/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      zone: zone,
      assigned_campaigns: assignedCampaigns
    });
  }catch(error) {
    return next(error);
  }
});

router.post("/zone/create", async(req, res) => {
  try {
    const publisherID = req.body.publisher_id;
    const { name, size } = req.body;
    const width = size.split("x")[0];
    const height = size.split("x")[1];

    await Zone.create({
      publisher: publisherID,
      name: name,
      width: width,
      height: height
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/zone/delete", async(req, res) => {
  try {
    const zoneIDs = req.body.ids;

    // Find placements related to the zone and delete it all
    for (let i=0; i<zoneIDs.length; i+=1) {
      const zoneID = zoneIDs[i];

      await Placement.delete({ "zone.id": zoneID });
      await Zone.delete({ id: zoneID });
    }

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/zone/campaign/assign", async(req, res) => {
  try {
    const zoneID = parseInt(req.body.zone_id);
    const zone = await Zone.retrieve({ id: zoneID });
    
    const campaigns = await Campaign.list({ });
    const response = [];

    for (let i=0; i<campaigns.length; i+=1) {
      const campaign = campaigns[i];
      campaign.eligible_ad_items = [];

      const campaignAssignments = await CampaignAssignment.list({ "campaign.id": campaign.id });

      for (let t=0; t<campaignAssignments.length; t+=1) {
        const campaignAssignment = campaignAssignments[t];
        const adItems = await AdItem.list({
          id: campaignAssignment.advertisement.id
        });

        for (let z=0; z<adItems.length; z+=1) {
          const adItem = adItems[z];

          if (zone.width === adItem.width && zone.height === adItem.height) {
            campaign.eligible_ad_items.push(adItem);
          }
        }
      }
    }

    for (let i=0; i<campaigns.length; i+=1) {
      const campaign = campaigns[i];
      const advertiser = await Advertiser.retrieve({ id: campaign.advertiser });

      response.push({
        id: campaign.id,
        name: campaign.name,
        eligible_ad_items: campaign.eligible_ad_items.length,
        advertiser: advertiser.name
      });
    }

    return res.send(response);
  }catch(error) {
    return res.send(error);
  }
});

export default router;
