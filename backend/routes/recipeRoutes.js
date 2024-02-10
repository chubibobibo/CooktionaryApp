import express from "express";
const router = express.Router();

import { createRecipe } from "../controllers/recipeControllers.js";

router.post("/createRecipe", createRecipe);

export default router;
