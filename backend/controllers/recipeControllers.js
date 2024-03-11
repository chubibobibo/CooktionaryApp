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
  if (req.body.avatarUrl) {
    //check avatarUrl in the req.body from the forms(we used state to submit)
    const response = await cloudinary.v2.uploader.upload(
      req.body.avatarUrl,
      req.body.avatarPublicId
    ); //path of the image file in the public storage
    req.body.avatarUrl = response.secure_url;
    req.body.avatarPublicId = response.public_id;
  }
  //UPDATE: adding a created by property
  //Update created a new property in the RecipeSchema that will hold the value of the owner of the recipe (coming from the req.user.userName upon logging in).
  req.body.createdBy = req.user.userId;
  req.body.author = req.user.userName;
  const newRecipe = await RecipeModel.create(req.body);
  console.log(newRecipe);
  if (!newRecipe) {
    throw ExpressError("No recipe created", 400);
  }
  res.status(200).json({ message: "new recipe created", newRecipe });
};

//all recipes
//Update: changed finding all recipe instead of the ones created by the logged user.
//update: implementing query
export const getAllRecipes = async (req, res) => {
  //implementing query
  const { search, dish } = req.query;
  console.log(req.query);
  //object to use in the find query. empty string to retrun all recipes if no queries are found.
  const queryObj = {};

  //checking for req.query(search), This will compare the req.query(search) to the properties we have in the DB (recipeName and createdBy). 'i' ignores letter cases.
  //$or is to create objects depending on the search queries
  if (search) {
    queryObj.$or = [
      {
        recipeName: { $regex: search, $options: "i" },
      },
    ];
  }

  //managing queries for select inputs (dish)
  //dish is the name of the select input
  if (dish && dish !== "all") {
    queryObj.dish = dish;
  }

  const allRecipes = await RecipeModel.find(queryObj); //find all recipe, returns an array
  // console.log(allRecipes);
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
  // limiting access of a single recipe depending if user is admin or the author.
  // if (
  //   req.user.role !== "admin" &&
  //   singleRecipe.createdBy.toString() !== req.user.userId
  // ) {
  //   throw new ExpressError("user not authorized");
  // }

  res.status(200).json({ message: "Recipe found", singleRecipe });
};

//edit recipe
export const editRecipe = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data found", 404);
  }

  const { id } = req.params;
  if (req.body.avatarUrl) {
    const response = await cloudinary.v2.uploader.upload(req.body.avatarUrl); //cloudinary upload API
    req.body.avatarUrl = response.secure_url;
    req.body.avatarPublicId = response.public_id;
  }

  //searching the specific recipe using params to check whether it contains a avatarPublicId property, which we will then destroy using cloudinary destroy API to avoid uploading a new image to cloudinary everytime
  const oldRecipe = await RecipeModel.findById(id);
  if (oldRecipe.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(oldRecipe.avatarPublicId);
  }

  //limiting the access to editing recipe
  if (
    req.user.role !== "admin" &&
    oldRecipe.createdBy.toString() !== req.user.userId
  ) {
    throw new ExpressError("User not authorized", 400);
  }
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
  //limit deleting of recipe to authors only
  const foundRecipe = await RecipeModel.findById(id);
  console.log(`foundRecipe ${foundRecipe}`);
  if (
    req.user.role !== "admin" &&
    foundRecipe.createdBy.toString() !== req.user.userId
  ) {
    throw new ExpressError("User not authorized", 400);
  }
  const deletedRecipe = await RecipeModel.findByIdAndDelete(id);
  if (!deletedRecipe) {
    throw new ExpressError("cannot delete recipe", 404);
  }
  res.status(200).json({ message: "Recipe deleted" });
};
