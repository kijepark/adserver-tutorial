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
    default: "publisher",
    required: true
  },
  name: {
    type: String,
    default: "",
    required: true
  },
  domain: {
    type: String,
    default: ""
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "publisher_id",
  inc_field: "id",
  collection_name: "ids"
});

module.exports = mongoose.model("publisher", schema);
