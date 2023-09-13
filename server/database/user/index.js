import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String }
},
    {
        timestamps: true
    });

UserSchema.methods.generateJWT = function () {
    return jwt.sign({ user: this._id.toString() }, "user");
}

UserSchema.statics.findByEmail = async ({ email }) => {
    // Check wheather the email exist
    const checkUserByEmail = await UserModel.findOne({ email });

    if (checkUserByEmail) {
        throw new Error("User Already Exist!");
    }
    return false;
};

UserSchema.statics.findByUsername = async ({ username }) => {
    // Check whether the username exists
    const checkUserByUsername = await UserModel.findOne({ username });
  
    if (checkUserByUsername) {
      throw new Error("Username Already Exists!");
    }
    return false;
  };

  UserSchema.statics.findByEmailOrUsername = async ({ email, username }) => {
    // Check whether the user exists by email or username
    const user = await UserModel.findOne({ $or: [{ email }, { username }] });
  
    return user;
  };
  

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    // Check if email exist
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does not exist!");

    // compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password)
    if (!doesPasswordMatch) throw new Error("Invalid Password!");

    return user;
}
UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password"))
        return next();

    bcrypt.genSalt(3, (error, salt) => {
        if (error)
            return next(error);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error)
                return next(error);
            user.password = hash;
            return next();
        })
    })
});

export const UserModel = mongoose.model("Users", UserSchema);