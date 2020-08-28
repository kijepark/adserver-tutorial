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
    default: "campaign",
    required: true
  },
  name: {
    type: String,
    default: "",
    required: true
  },
  advertiser: {
    type: Number,
    default: 0,
    required: true
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "campaign_id",
  inc_field: "id",
  collection_name: "ids"
});

export default mongoose.model("campaign", schema);
