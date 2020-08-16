var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
    unique: true
  },
  object: {
    type: String,
    default: "publisher"
  },
  name: {
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
