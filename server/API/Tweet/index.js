// Import necessary modules
import express from "express";
import passport from "passport";
import { UserModel } from "../../database/user/index.js";
import { TweetModel } from "../../database/tweet/index.js";

import mongoose from "mongoose";
const Router = express.Router();

/*
Route: /tweet/following
Description: get all the tweets from the following
params: NONE
Access: Public
Method: GET
*/

Router.get(
  "/following",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;

      const followedUsers = currentUser.following;

      const tweetsFromFollowedUsers = await TweetModel.find({
        user: { $in: followedUsers },
      }).sort({ createdAt: -1 });

      res.status(200).json({ tweets: tweetsFromFollowedUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

/*
Route: /tweet/user/:userId
Description: Get tweets posted by a specific user
params: userId (User's ID)
Access: Public
Method: GET
*/

Router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const tweetsByUser = await TweetModel.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(tweetsByUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
Route: /tweet/new
Description: Creete a new tweet
params: NONE
Access: Public
Method: POST
*/
Router.post("/new", async (req, res) => {
  try {
    const { content, user } = req.body;
    const tweet = new TweetModel({ content, user });
    await tweet.save();
    const userToUpdate = await UserModel.findById(user);
    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    userToUpdate.tweets.push(tweet._id);
    await userToUpdate.save();

    res.status(201).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
Route: /tweeet/getall
Description: get all tweets
params: NONE
Access: Public
Method: GET
*/
Router.get("/getall", async (req, res) => {
  try {
    const tweets = await TweetModel.find().sort({ createdAt: -1 });
    res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
Route: /tweet/get/:tweetId
Description: get a particular tweet with the tweetID
params: NONE
Access: Public
Method: GET
*/
Router.get("/get/:tweetId", async (req, res) => {
  try {
    const tweet = await TweetModel.findById(req.params.tweetId);
    if (!tweet) {
      res.status(404).json({ error: "Tweet not found" });
      return;
    }
    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
Route: /tweet/update/:tweetId
Description: SUpdate the tweet with the tweetID
params: NONE
Access: Public
Method: PUL
*/
Router.put("/update/:tweetId", async (req, res) => {
  try {
    const { content } = req.body;
    const tweet = await TweetModel.findByIdAndUpdate(
      req.params.tweetId,
      { content },
      { new: true }
    );
    if (!tweet) {
      res.status(404).json({ error: "Tweet not found" });
      return;
    }
    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
Route: /tweet/delete/:tweetId
Description: delete a particular tweet with tweetId
params: NONE
Access: Public
Method: Delete
*/
Router.delete("/delete/:tweetId", async (req, res) => {
  try {
    const tweet = await TweetModel.findByIdAndDelete(req.params.tweetId);
    if (!tweet) {
      res.status(404).json({ error: "Tweet not found" });
      return;
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default Router;
