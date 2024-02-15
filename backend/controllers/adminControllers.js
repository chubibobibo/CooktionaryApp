//import schema
import { UserModel } from "../models/UserSchema.js";
//error handling
import { ExpressError } from "../errors/ExpressError.js";

export const loggedUser = async (req, res) => {
  const user = await UserModel.findById(req.user.userId);
  if (!user) {
    throw new ExpressError("User is not logged in");
  }
  console.log(req.user);
  res.status(200).json({ message: `${req.user.role} logged in` });
};
