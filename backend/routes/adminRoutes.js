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
} from "../controllers/adminControllers.js";
//import isAdmin middleware to limit the access
import { isAdmin } from "../middleware/authentication.js";

router.get("/loggedUser", loggedUser);
router.get("/appStats", isAdmin("admin"), appStats);
router.patch("/updateUser", upload.single("avatar"), updateUser);

export default router;
