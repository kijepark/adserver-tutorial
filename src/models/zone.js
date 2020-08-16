var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
    unique: true
  },
  object: {
    type: String,
    default: "zone"
  },
  name: {
    type: String,
    default: ""
  },
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  publisher: {
    type: Number,
    default: 0
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "zone_id",
  inc_field: "id",
  collection_name: "ids"
});

module.exports = mongoose.model("zone", schema);
