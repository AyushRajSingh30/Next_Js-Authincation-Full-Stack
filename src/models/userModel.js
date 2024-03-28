import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpire: Date,
});

//way to export model in mongodb in nextjs
//cheak model of user avilable in mongobd if not avilable make new model

//mongoose.models.user is cheak if user avilable go for access
// mongoose.model("users", userSchema)  model are not avilable created model

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
