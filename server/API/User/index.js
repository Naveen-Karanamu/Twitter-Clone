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

export default Router;
