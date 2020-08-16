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
    default: "advertiser",
    required: true
  },
  name: {
    type: String,
    default: "",
    required: true
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "advertiser_id",
  inc_field: "id",
  collection_name: "ids"
});

module.exports = mongoose.model("advertiser", schema);
