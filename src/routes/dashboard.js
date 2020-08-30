import express from "express";

import Report from "./../controllers/report";
import Publisher from "./../controllers/publisher";
import Advertiser from "./../controllers/advertiser";

const router = express.Router();

router.get("/", async(req, res, next) => {
  try {
    const reports = await Report.overview();
    const publishersAndZones = await Publisher.listAndZones({ });
    const advertisersAndZones = await Advertiser.listAndCampaigns({ });

    return res.render("dashboard", {
      reports: JSON.stringify(reports),
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  }catch(error) {
    return next(error);
  }
});

export default router;
