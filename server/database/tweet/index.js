import mongoose from "mongoose";

const TweetSchema = mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const TweetModel = mongoose.model("Reviews", TweetSchema);