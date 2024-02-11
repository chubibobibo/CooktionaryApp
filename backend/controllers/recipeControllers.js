//express async error handler
import "express-async-errors";
//import ExpressError to throw
import { ExpressError } from "../errors/ExpressError.js";
import { RecipeModel } from "../models/RecipeSchema.js";

//creating a recipe
export const createRecipe = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", 404);
  }
  const newRecipe = await RecipeModel.create(req.body);
  if (!newRecipe) {
    throw ExpressError("No recipe created", 400);
  }
  res.status(200).json({ message: "new recipe created", newRecipe });
};

//all recipes
export const getAllRecipes = async (req, res) => {
  const allRecipes = await RecipeModel.find({}); //find all, returns an array
  if (allRecipes.length === 0) {
    throw new ExpressError("No recipes found", 404);
    // res.status(400).json({ message: "No recipes found" });
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
  res.status(200).json({ message: "Recipe found", singleRecipe });
};
