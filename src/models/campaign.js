var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
    unique: true
  },
  object: {
    type: String,
    default: "campaign"
  },
  name: {
    type: String,
    default: ""
  },
  advertiser: {
    type: Number,
    default: 0
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "campaign_id",
  inc_field: "id",
  collection_name: "ids"
});

module.exports = mongoose.model("campaign", schema);
