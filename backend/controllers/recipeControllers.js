import { RecipeModel } from "../models/RecipeSchema.js";

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
