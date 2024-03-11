import express from "express";
const router = express.Router();

//multer storage middleware
import upload from "../middleware/multerMiddleware.js";

//import input validator
import {
  validateCreateRecipe,
  validateParams,
} from "../middleware/inputValidation.js";

//check guest user
import { isGuestUser } from "../middleware/authentication.js";

//recipe controller
import {
  createRecipe,
  getAllRecipes,
  getSingleRecipe,
  editRecipe,
  deleteRecipe,
} from "../controllers/recipeControllers.js";

router.get("/", getAllRecipes);
router.post(
  "/createRecipe",
  // isGuestUser,
  upload.single("avatar"),
  validateCreateRecipe,
  createRecipe
);
router.get("/:id", validateParams, getSingleRecipe);
router.patch("/:id", isGuestUser, validateParams, editRecipe);
router.delete("/:id", isGuestUser, validateParams, deleteRecipe);

export default router;
