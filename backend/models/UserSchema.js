import mongoose from "mongoose";
const { Schema } = mongoose;

//import roles object for enum values
import roles from "../utils/constants.js";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(roles),
    required: true,
  },
});

export default UserModel = mongoose.model("UserModel", UserSchema);
