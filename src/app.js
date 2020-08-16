var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var mongooseSequence = require("mongoose-sequence")(mongoose);

// Declare Global Variables
global.mongooseSequence = mongooseSequence;

var config = require("./../config.json");
var router = require("./router");
var handlebars = require("./handlebars")();

var app = express();
var port = 3000;

// Require controllers for default documents
var Publisher = require("./controllers/publisher");
var Zone = require("./controllers/zone");
var Advertiser = require("./controllers/advertiser");
var Campaign = require("./controllers/campaign");
var AdItem = require("./controllers/adItem");
var CampaignAssignment = require("./controllers/campaignAssignment");

// Connect to Database
var databaseUri = config.database.uri;
var databaseOptions = config.database.options;
mongoose.connect(databaseUri, databaseOptions, async function(error) {
  if (error) {
    console.error(error);
    return;
  }
  console.log("MongoDB connected");

  // Creates Default Models
  var publishers = await Publisher.list({ });
  var zones = await Zone.list({ });
  var advertisers = await Advertiser.list({ });
  var campaigns = await Campaign.list({ });
  var adItems = await AdItem.list({ });
  var campaignAssignments = await CampaignAssignment.list({ });

  if (!publishers.length && !zones.length) {
    var publisher = await Publisher.create({ name: "Default Publisher" });
    var zone = await Zone.create({ name: "Default Zone", publisher: publisher.id });
  }

  if (!advertisers.length && !campaigns.length && !adItems.length && !campaignAssignments.length) {
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
  }
});

// Set Template Engine
app.engine("handlebars", expressHandlebars({
  layoutsDir: __dirname + "/../views/layouts/",
  partialsDir: __dirname + "/../views"
}));
app.set("view engine", "handlebars");

// Set Middlewares
app.use(express.static("public"));
app.use(router);

// Error Handling 404, 500
app.use(function(req, res, next) {
  console.warn("404 Page Not Found", req.url);
  res.sendStatus(404);
  return;
});

app.use(function(error, req, res, next) {
  console.error(error);
  res.sendStatus(500);
  return;
});

app.listen(port, function() {
  console.log("Server is running on port", port);
});
