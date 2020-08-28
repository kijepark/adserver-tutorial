import express from "express";

import Publisher from "./../controllers/publisher";
import Advertiser from "./../controllers/advertiser";

const router = express.Router();

router.get("/", async(req, res, next) => {
  try {
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    return res.render("dashboard", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  }catch(error) {
    return next(error);
  }
});

export default router;
