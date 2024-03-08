//import schema
import { UserModel } from "../models/UserSchema.js";
import { RecipeModel } from "../models/RecipeSchema.js";
//error handling
import { ExpressError } from "../errors/ExpressError.js";

//cloudinary
import cloudinary from "cloudinary";
import { promises as fs } from "fs"; //files system(fs) will be used in deleting the image in the public folder.

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
  //obtaining all the req.body and saving it to a var
  //then deleting the apssword from the req.body(obj)
  const obj = { ...req.body };
  delete obj.password;
  //checking if req.file exist to use cloudinary upload api, remember that avatar is not required.
  // console.log(req.file);
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path); //uploading the path of the image parsed by multer (in public/uploads)
    // console.log(response);
    await fs.unlink(req.file.path); //removing the image file in the public folder.
    //accessing and adding the avatarUrl and avatarPublicId from the UserSchema using the req.body(obj)
    obj.avatarUrl = response.secure_url; //secure_url the url sent by cloudinary
    obj.avatarPublicId = response.public_id;
    console.log(obj.avatarUrl);
  }

  //find current logged in user so that we can obtain it's avatarPublicId
  const oldUser = await UserModel.findById(req.user.userId);

  //delete image in cloudinary once same publicId to delete it in cloudinary and replace with new image
  if (req.file && oldUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(oldUser.avatarPublicId);
  }

  //instead of the id coming from params, we will be getting the id of the logged in user
  const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, obj, {
    new: true,
  });
  if (!updatedUser) {
    throw new ExpressError("User cannot be updated", 400);
  }
  res.status(200).json({ message: "user updated", updatedUser });
};

export const recipeOwner = async (req, res) => {
  const { id } = req.params;
  const foundRecipe = await RecipeModel.findById(id);
  if (!foundRecipe) {
    throw new ExpressError("Recipe not found", 404);
  }
  const foundOwner = await UserModel.findById(foundRecipe.createdBy);
  // console.log(foundOwner);
  if (!foundOwner) {
    throw new ExpressError("Recipe owner not found", 404);
  }
  res.status(200).json({ message: "Recipe Owner", foundOwner });
};
