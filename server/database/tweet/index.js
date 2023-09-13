import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  createdAt: { type: Date, default: Date.now },
});

export const TweetModel = mongoose.model("Tweet", tweetSchema);
