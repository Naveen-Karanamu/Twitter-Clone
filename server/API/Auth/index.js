//Libraries
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

// Models
import { UserModel } from "../../database/user/index.js";

// Validations
import { validateSignUp, validateSignIn } from "../../Validations/auth.js";

const Router = express.Router();

// Import the cors middleware
import cors from "cors";
Router.use(cors());

/*
Route: /signup
Description: Signup with email / Phone number and password
params: NONE
Access: Public
Method: POST
*/
Router.post("/signup", async (req, res) => {
  try {
    await validateSignUp(req.body.credentials);

    await UserModel.findByEmail(req.body.credentials);

    await UserModel.findByUsername(req.body.credentials);

    const newUser = await UserModel.create(req.body.credentials);

    const token = newUser.generateJWT();

    return res.status(200).json({ token, status: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route: /signin
Description: Signin with email & password
params: NONE
Access: Public
Method: POST
*/
Router.post("/signin", async (req, res) => {
    try {
    //   console.time();
      await validateSignIn(req.body.credentials);
  
      const { email, username, password } = req.body.credentials;
  
      let user;
  
      if (email) {
        user = await UserModel.findByEmailAndPassword({ email, password });
      } else if (username) {
        user = await UserModel.findByEmailOrUsername({ username });
      } else {
        throw new Error("Invalid credentials provided.");
      }
  
      if (!user) {
        throw new Error("User does not exist!");
      }
  
      // Compare password
      const doesPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!doesPasswordMatch) {
        throw new Error("Invalid Password!");
      }
  
      // Generate JWT token
      const token = user.generateJWT();
  
      return res.status(200).json({ token, status: "Success" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  

export default Router;
