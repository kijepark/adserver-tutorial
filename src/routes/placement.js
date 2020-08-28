import express from "express";

import Placement from "./../controllers/placement";

const router = express.Router();

router.post("/placement/create", async(req, res) => {
  try {
    const zoneID = parseInt(req.body.zone_id);
    const campaignID = parseInt(req.body.campaign_id);

    await Placement.create({
      "zone.id": zoneID,
      "advertisement.id": campaignID
    });

    return res.send();
  }catch(error) {
    return res.send(error);
  }
});

router.post("/placement/delete", async(req, res) => {
  try {
    const campaignIDs = req.body.ids;
    const zoneID = req.body.zone_id;

    for (let i=0; i<campaignIDs.length; i+=1) {
      const campaignID = parseInt(campaignIDs[i]);
      
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
