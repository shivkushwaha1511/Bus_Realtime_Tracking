import mongoose from "mongoose";
const { Schema } = mongoose;

const busSchema = new Schema(
  {
    busNo: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    latitude: {
      type: Number,
      required: true,
      default: 23.20104034367859,
    },
    longitude: {
      type: Number,
      required: true,
      default: 79.88102018465851,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bus", busSchema);
