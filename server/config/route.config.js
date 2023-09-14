// Import necessary modules
import JwtPassport from "passport-jwt";
import dotenv from "dotenv";
import { UserModel } from "../database/user/index.js";

// Load the .env file using dotenv.config()
dotenv.config();

const JWTStratergy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "twitter",
};

export default (passport) => {
  passport.use(
    new JWTStratergy(options, async (jwt__payload, done) => {
      try {
        const doesUserExist = await UserModel.findById(jwt__payload.user);
        if (!doesUserExist) return done(null, false);
        return done(null, doesUserExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};
