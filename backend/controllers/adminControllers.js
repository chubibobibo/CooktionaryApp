//import schema
import { UserModel } from "../models/UserSchema.js";
import { RecipeModel } from "../models/RecipeSchema.js";
//error handling
import { ExpressError } from "../errors/ExpressError.js";

//logged user
export const loggedUser = async (req, res) => {
  const user = await UserModel.findById(req.user.userId);
  if (!user) {
    throw new ExpressError("User is not logged in");
  }
  res.status(200).json({ message: `${req.user.role} logged in`, user });
};

//application stats
export const appStats = async (req, res) => {
  const totalRecipes = await RecipeModel.countDocuments();
  const totalUsers = await UserModel.countDocuments();
  res.status(200).json({ message: "admin stats", totalRecipes, totalUsers });
};

//updating user profile
export const updateUser = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", 400);
  }
  //isntead of the id coming from params, we will be getting the id of the logged in user
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    req.body,
    { new: true }
  );
  if (!updatedUser) {
    throw new ExpressError("User cannot be updated", 400);
  }
  res.status(200).json({ message: "user updated", updatedUser });
};
