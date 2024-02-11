import { RecipeModel } from "../models/RecipeSchema.js";

//creating a recipe
export const createRecipe = async (req, res) => {
  if (!req.body) {
    res.status(404).json({ message: "No data" });
  }
  try {
    const newRecipe = await RecipeModel.create(req.body);
    res.status(200).json({ message: "new recipe created", newRecipe });
  } catch (err) {
    console.log(err);
  }
};

//all recipes
export const getAllRecipes = async (req, res) => {
  const allRecipes = await RecipeModel.find({}); //find all, returns an array
  if (allRecipes.length === 0) {
    res.status(400).json({ message: "No recipes found" });
  }
  res.status(200).json({ message: "Recipes found", allRecipes });
};

//get single recipe
export const getSingleRecipe = async (req, res) => {
  //destructure params
  const { id } = req.params;
  const singleRecipe = await RecipeModel.findById(id);
  if (!singleRecipe) {
    res.status(404).json({ mesasage: "Recipe not found" });
  }
  res.status(200).json({ message: "Recipe found", singleRecipe });
};
