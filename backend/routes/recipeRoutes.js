import express from "express";
const router = express.Router();

import upload from "../middleware/multerMiddleware.js";

//import input validator
import {
  validateCreateRecipe,
  validateParams,
} from "../middleware/inputValidation.js";

//recipe controller
import {
  createRecipe,
  getAllRecipes,
  getSingleRecipe,
  editRecipe,
  deleteRecipe,
} from "../controllers/recipeControllers.js";

router.get("/", getAllRecipes);
router.post("/createRecipe", validateCreateRecipe, createRecipe);
router.get("/:id", validateParams, getSingleRecipe);
router.patch("/:id", validateParams, editRecipe);
router.delete("/:id", validateParams, deleteRecipe);

export default router;
