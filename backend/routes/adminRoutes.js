import express from "express";
import { Router } from "express";
const router = express.Router();

//multer import
import upload from "../middleware/multerMiddleware.js";
//import controller
import {
  loggedUser,
  appStats,
  updateUser,
  recipeOwner,
} from "../controllers/adminControllers.js";

//import isAdmin middleware to limit the access
import { isAdmin } from "../middleware/authentication.js";

//check guest user
import { isGuestUser } from "../middleware/authentication.js";

router.get("/loggedUser", loggedUser);
router.get("/appStats", isAdmin("admin"), appStats);
router.patch("/updateUser", isGuestUser, upload.single("avatar"), updateUser);
router.get("/owner", recipeOwner);

export default router;
