//express async error handler
import "express-async-errors";
//import ExpressError to throw
import { ExpressError } from "../errors/ExpressError.js";
import { RecipeModel } from "../models/RecipeSchema.js";

import cloudinary from "cloudinary";
import { promises as fs } from "fs";

//creating a recipe
export const createRecipe = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", 404);
  }
  //cloudinary upload
  if (req.file) {
    console.log(req.file);
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    req.body.avatarUrl = response.secure_url;
    req.body.avatarPublicId = response.public_id;
  }
  //UPDATE: adding a created by property
  req.body.createdBy = req.user.userId;
  const newRecipe = await RecipeModel.create(req.body);
  if (!newRecipe) {
    throw ExpressError("No recipe created", 400);
  }
  res.status(200).json({ message: "new recipe created", newRecipe });
};

//all recipes
export const getAllRecipes = async (req, res) => {
  const allRecipes = await RecipeModel.find({ createdBy: req.user.userId }); //find all recipe of logged user, returns an array
  console.log(allRecipes);
  if (allRecipes.length === 0) {
    throw new ExpressError("No recipes found", 404);
  }
  res.status(200).json({ message: "Recipes found", allRecipes });
};

//get single recipe
export const getSingleRecipe = async (req, res) => {
  //destructure params
  const { id } = req.params;
  const singleRecipe = await RecipeModel.findById(id);
  if (!singleRecipe) {
    throw new ExpressError("Recipe not found", 404);
  }
  //limiting access of a single recipe depending if user is admin or the author.
  if (req.user.role !== "admin" && singleRecipe.createdBy !== req.user.userId) {
    throw new ExpressError("user not authorized");
  }
  res.status(200).json({ message: "Recipe found", singleRecipe });
};

//edit recipe
export const editRecipe = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data found", 404);
  }
  const { id } = req.params;
  const editedRecipe = await RecipeModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!editedRecipe) {
    throw new ExpressError("Cannot update recipe", 404);
  }
  res.status(200).json({ message: `recipe ${id} updated` });
};

//delete recipe
export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const deletedRecipe = await RecipeModel.findByIdAndDelete(id);
  if (!deletedRecipe) {
    throw new ExpressError("cannot delete recipe", 404);
  }
  res.status(200).json({ message: "Recipe deleted" });
};
