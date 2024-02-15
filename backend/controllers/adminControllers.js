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
  res.status(200).json({ message: `${req.user.role} logged in` });
};

//application stats
export const appStats = async (req, res) => {
  const totalRecipes = await RecipeModel.countDocuments();
  const totalUsers = await UserModel.countDocuments();
  res.status(200).json({ message: "admin stats", totalRecipes, totalUsers });
};
