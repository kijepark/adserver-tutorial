import mongoose from "mongoose";
import MongooseSequence from "mongoose-sequence";

const mongooseSequence = MongooseSequence(mongoose);
const schema = new mongoose.Schema({
  placement: {
    type: Number,
    default: 0,
    required: true
  },
  ad_item: {
    type: {
      type: String,
      default: "ad_item",
      required: true
    },
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  campaign: {
    type: {
      type: String,
      default: "campaign",
      required: true
    },
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  zone: {
    type: {
      type: String,
      default: "zone",
      required: true
    },
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  impressions: {
    type: Number,
    default: 0,
    required: true
  },
  clicks: {
    type: Number,
    default: 0,
    required: true
  },
  date: {
    type: String,
    default: "",
    required: true
  }
});

export default mongoose.model("report", schema);
