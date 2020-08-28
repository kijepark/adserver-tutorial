import mongoose from "mongoose";
import MongooseSequence from "mongoose-sequence";

const mongooseSequence = MongooseSequence(mongoose);
const schema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
    unique: true,
    required: true
  },
  object: {
    type: String,
    default: "ad_item",
    required: true
  },
  name: {
    type: String,
    default: "",
    required: true
  },
  width: {
    type: Number,
    default: 300,
    required: true
  },
  height: {
    type: Number,
    default: 250,
    required: true
  },
  location: {
    type: String,
    default: ""
  },
  creative_url: {
    type: String,
    default: ""
  },
  html_target: {
    type: String,
    default: ""
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "ad_item_id",
  inc_field: "id",
  collection_name: "ids"
});

export default mongoose.model("ad_item", schema);
