var Publisher = require("./controllers/publisher");
var Zone = require("./controllers/zone");
var Advertiser = require("./controllers/advertiser");
var Campaign = require("./controllers/campaign");
var AdItem = require("./controllers/adItem");
var CampaignAssignment = require("./controllers/campaignAssignment");
var Placement = require("./controllers/placement");

module.exports = async function() {
  var publishers = await Publisher.list({ });
  var zones = await Zone.list({ });
  var advertisers = await Advertiser.list({ });
  var campaigns = await Campaign.list({ });
  var adItems = await AdItem.list({ });
  var campaignAssignments = await CampaignAssignment.list({ });
  var placements = await Placement.list({ });

  if (!publishers.length && !zones.length
    && !advertisers.length && !campaigns.length
    && !adItems.length && !campaignAssignments.length
    && !placements.length) {
    var publisher = await Publisher.create({ name: "Default Publisher" });
    var zone = await Zone.create({ name: "Default Zone", publisher: publisher.id });
    var advertiser = await Advertiser.create({ name: "Default Advertiser" });
    var campaign = await Campaign.create({ name: "Default Campaign", advertiser: advertiser.id });
    var adItem = await AdItem.create({
      name: "Default Ad Item",
      width: 300,
      height: 250,
      location: "http://kijepark.com",
      creative_url: "https://i.ibb.co/kqR8Z8r/banner.jpg",
      html_target: "_blank"
    });
    var campaignAssignment = await CampaignAssignment.create({
      advertisement: {
        id: adItem.id
      },
      campaign: {
        id: campaign.id
      }
    });
    var placement = await Placement.create({
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
