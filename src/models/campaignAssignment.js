var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
    unique: true,
    required: true
  },
  object: {
    type: String,
    default: "campaign_assignment",
    required: true
  },
  advertisement: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  campaign: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "campaign_assignment_id",
  inc_field: "id",
  collection_name: "ids"
});

module.exports = mongoose.model("campaign_assignment", schema);
