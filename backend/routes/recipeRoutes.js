import express from "express";
const router = express.Router();

//recipe controller
import {
  createRecipe,
  getAllRecipes,
  getSingleRecipe,
} from "../controllers/recipeControllers.js";

router.get("/", getAllRecipes);
router.post("/createRecipe", createRecipe);
router.get("/:id", getSingleRecipe);

export default router;
