import express from "express";
const router = express.Router();

//import input validator
import { validateCreateRecipe } from "../middleware/inputValidation.js";

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
router.get("/:id", getSingleRecipe);
router.patch("/:id", editRecipe);
router.delete("/:id", deleteRecipe);

export default router;
