import express from "express";
import dashboardRoute from "./routes/dashboard";
import publisherRoute from "./routes/publisher";
import zoneRoute from "./routes/zone";
import advertiserRoute from "./routes/advertiser";
import campaignRoute from "./routes/campaign";
import adServeRoute from "./routes/adServe";
import placementRoute from "./routes/placement";
import adItemRoute from "./routes/adItem";

const router = express.Router();

router.use(dashboardRoute);
router.use(publisherRoute);
router.use(zoneRoute);
router.use(advertiserRoute);
router.use(campaignRoute);
router.use(adServeRoute);
router.use(placementRoute);
router.use(adItemRoute);

export default router;
