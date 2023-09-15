import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    images: [
      {
        location: { type: String, required: true },
      },
    ],
  },
  {
    ETag: {
      type: String,
      required: true,
    },
    ServerSideEncryption: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    Bucket: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ImageModel = mongoose.model("Images", ImageSchema);
