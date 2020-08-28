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
    default: "placement",
    required: true
  },
  zone: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  advertisement: {
    id: {
      type: Number,
      default: 0,
      required: true
    },
    type: {
      type: String,
      default: ""
    }
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "placement_id",
  inc_field: "id",
  collection_name: "ids"
});

export default mongoose.model("placement", schema);
