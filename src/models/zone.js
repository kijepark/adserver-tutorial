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
    default: "zone",
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
  publisher: {
    type: Number,
    default: 0,
    required: true
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "zone_id",
  inc_field: "id",
  collection_name: "ids"
});

export default mongoose.model("zone", schema);
