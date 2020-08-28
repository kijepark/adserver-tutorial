import Publisher from "./controllers/publisher";
import Zone from "./controllers/zone";
import Advertiser from "./controllers/advertiser";
import Campaign from "./controllers/campaign";
import AdItem from "./controllers/adItem";
import CampaignAssignment from "./controllers/campaignAssignment";
import Placement from "./controllers/placement";

export default async() => {
  const publishers = await Publisher.list({ });
  const zones = await Zone.list({ });
  const advertisers = await Advertiser.list({ });
  const campaigns = await Campaign.list({ });
  const adItems = await AdItem.list({ });
  const campaignAssignments = await CampaignAssignment.list({ });
  const placements = await Placement.list({ });

  if (!publishers.length && !zones.length
    && !advertisers.length && !campaigns.length
    && !adItems.length && !campaignAssignments.length
    && !placements.length) {
    const publisher = await Publisher.create({ name: "Default Publisher" });
    const zone = await Zone.create({ name: "Default Zone", publisher: publisher.id });
    const advertiser = await Advertiser.create({ name: "Default Advertiser" });
    const campaign = await Campaign.create({ name: "Default Campaign", advertiser: advertiser.id });
    const adItem = await AdItem.create({
      name: "Default Ad Item",
      width: 300,
      height: 250,
      location: "http://kijepark.com",
      creative_url: "https://i.ibb.co/kqR8Z8r/banner.jpg",
      html_target: "_blank"
    });
    const campaignAssignment = await CampaignAssignment.create({
      advertisement: {
        id: adItem.id
      },
      campaign: {
        id: campaign.id
      }
    });
    const placement = await Placement.create({
      zone: {
        id: zone.id
      },
      advertisement: {
        id: campaign.id,
        type: campaign.object
      }
    });
  }
}
