import express from "express";

import { UserModel } from "../../database/user/index.js";

const Router = express.Router();

/*
Route: /user/get/:objectId
Description: Get Specific User
params: NONE
Access: Public
Method: GET
*/
Router.get("/get/:objectId", async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const user = await UserModel.findById(objectId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/*
Route: /user/get/:objectId
Description: Get Specific User
params: NONE
Access: Public
Method: GET
*/
Router.get
Router.get('/getall', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
Route: /user/follow/:userId
Description: To follow an user
params: NONE
Access: Public
Method: POST
*/
// Router.post('/follow/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { user } = req.body;

//   try {
//     const currentUser = await UserModel.findById(user._id);
//     const targetUser = await UserModel.findById(userId);

//     if (!currentUser || !targetUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     await currentUser.addFollower(targetUser._id);
//     res.status(200).json({ message: 'User followed successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
Router.post('/follow/:userId', async (req, res) => {
  const { userId } = req.params;
  const { user } = req.body; 

  try {
    const currentUser = await UserModel.findById(user._id);
    const targetUser = await UserModel.findById(userId);
    // console.log(user._id);

    if (!currentUser ) {
      return res.status(404).json({ error: 'Current User not found' });
    }
    if (!targetUser) {
      return res.status(404).json({ error: 'Target User not found' });
    }

    // Check if the current user is already following the target user
    if (!currentUser.following.includes(userId)) {
      currentUser.following.push(userId);
      await currentUser.save();
    }
 
    // Update the target user's followers
    // if (!targetUser.followers.includes(user._id)) {
    //   targetUser.followers.push(user._id);
    //   await targetUser.save();
    // }

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/*
Route: /user/unfollow/:userId
Description: To unfollow an user
params: NONE
Access: Public
Method: POST
*/
Router.post('/unfollow/:userId', async (req, res) => {
  const { userId } = req.params;
  const { user } = req.body;
  try {
    const currentUser = await UserModel.findById(user);
    const targetUser = await UserModel.findById(userId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    currentUser.following = currentUser.following.filter(follower => follower.toString() !== targetUser._id.toString());
    await currentUser.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default Router;
