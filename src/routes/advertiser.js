import express from "express";

import Publisher from "./../controllers/publisher";
import Advertiser from "./../controllers/advertiser";
import Campaign from "./../controllers/campaign";
import CampaignAssignment from "./../controllers/campaignAssignment";
import AdItem from "./../controllers/adItem";
import Placement from "./../controllers/placement";

const router = express.Router();

router.get("/advertiser/list", async(req, res, next) => {
  try {
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    return res.render("advertiser/list", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  }catch(error) {
    return next(error);
  }
});

router.get("/advertiser/view", async(req, res, next) => {
  try {
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    const advertiserID = parseInt(req.query.advertiser_id);
    const advertiser = await Advertiser.retrieve({ id: advertiserID });
    const campaigns = await Campaign.listAndCampaignAssignments({ advertiser: advertiserID });

    return res.render("advertiser/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      advertiser: advertiser,
      campaigns: campaigns
    });
  }catch(error) {
    return next(error);
  }
});

router.post("/advertiser/create", async(req, res) => {
  try {
    const { name } = req.body;

    await Advertiser.create({
      name: name
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/advertiser/delete", async(req, res) => {
  try {
    const advertiserIDs = req.body.ids;

    for (let i=0; i<advertiserIDs.length; i+=1) {
      const advertiserID = advertiserIDs[i];
      const campaigns = await Campaign.list({ advertiser: advertiserID });

      for (let c=0; c<campaigns.length; c+=1) {
        const campaignID = campaigns[c].id;
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

      await Advertiser.delete({ id: advertiserID });
    }

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

export default router;
