//import for validator
import { body, param, validationResult } from "express-validator";
//import constants values for dish property
import { dish } from "../utils/constants.js";
//error handling
import { ExpressError } from "../errors/ExpressError.js";

//import mongoose needed in checking params
import mongoose from "mongoose";

//if valid mongo id search for specific recipe
import { RecipeModel } from "../models/RecipeSchema.js";
import { UserModel } from "../models/UserSchema.js";

//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

export const validateCreateRecipe = withValidationErrors([
  body("recipeName")
    .notEmpty()
    .withMessage("Recipe cannot be empty")
    .isLength({ max: 20 })
    .withMessage("recipe name cannot exceed 20 characters"),
  //syntax for checking an array using express validator
  body("recipeIngredients.*.ingredientName")
    .notEmpty()
    .withMessage("Ingreident name cannot be empty")
    .isLength({ max: 15 })
    .withMessage("Ingredient name cannot exceed 15 characters"),
  body("recipeIngredients.*.ingredientQty")
    .notEmpty()
    .withMessage("Qty should not be empty"),
  body("recipeInstructions")
    .notEmpty()
    .withMessage("recipe instructions cannot be empty"),
  body("cookingTime")
    .notEmpty()
    .withMessage("cooking time cannot be empty")
    .isFloat({ min: 1 })
    .withMessage("cannot be lower thatn 1"),
  body("dish")
    .notEmpty()
    .withMessage("Dish cannot be empty")
    .isIn(Object.values(dish))
    .withMessage("should be pork, chicken, beef, vegetarian, fish"),
]);

export const validateParams = withValidationErrors([
  param("id").custom(async (id) => {
    const validParam = mongoose.Types.ObjectId.isValid(id); //returns a boolean if valid mongo id
    if (!validParam) {
      throw new ExpressError("Not a valid mongo ID", 400);
    }
    //if param is valid mongo ID search for the specific recipe
    const foundRecipe = await RecipeModel.findById(id);
    if (!foundRecipe) {
      throw new ExpressError("no recipe with that ID", 404);
    }
  }),
]);

export const validateRegister = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("name cannot be empty")
    .isLength({ max: 25 })
    .withMessage("Name cannot exceed 25 characters"),
  //check email for uniqueness
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Should be a valid email")
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email }); //looking for the email passed as argument if exists in the database (UserModel).
      if (foundEmail) {
        throw new ExpressError("User already exist");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be greater than 8 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ max: 25 })
    .withMessage("Last name cannot exceed 25 characters"),
]);
