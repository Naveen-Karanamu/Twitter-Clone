// Import necessary modules
import express from "express";
import passport from "passport";
import { TweetModel } from "../../database/tweet/index.js";

const router = express.Router();

/*
Route: /tweet/following
Description: get all the tweets from the followers
params: NONE
Access: Public
Method: GET
*/

router.get(
  "/following",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;

      const followedUsers = currentUser.followers;

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
Route: /tweet/new
Description: Creete a new tweet
params: NONE
Access: Public
Method: POST
*/
router.post('/new', async (req, res) => {
  try {
    const { content, user } = req.body;
    const tweet = new Tweet({ content, user });
    await tweet.save();
    res.status(201).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
Route: /tweeet/getall
Description: get all tweets
params: NONE
Access: Public
Method: GET
*/
router.get('/getall', async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 });
    res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
Route: /tweet/get/:tweetId
Description: get a particular tweet with the tweetID
params: NONE
Access: Public
Method: GET
*/
router.get('/get/:tweetId', async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);
    if (!tweet) {
      res.status(404).json({ error: 'Tweet not found' });
      return;
    }
    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
Route: /tweet/update/:tweetId
Description: SUpdate the tweet with the tweetID
params: NONE
Access: Public
Method: PUL
*/
router.put('/update/:tweetId', async (req, res) => {
  try {
    const { content } = req.body;
    const tweet = await Tweet.findByIdAndUpdate(
      req.params.tweetId,
      { content },
      { new: true }
    );
    if (!tweet) {
      res.status(404).json({ error: 'Tweet not found' });
      return;
    }
    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
Route: /tweet/delete/:tweetId
Description: delete a particular tweet with tweetId
params: NONE
Access: Public
Method: Delete
*/
router.delete('/delete/:tweetId', async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(req.params.tweetId);
    if (!tweet) {
      res.status(404).json({ error: 'Tweet not found' });
      return;
    }
    res.status(204).end(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;
