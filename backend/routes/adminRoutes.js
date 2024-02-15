import express from "express";
import { Router } from "express";
const router = express.Router();

//import controller
import { loggedUser, appStats } from "../controllers/adminControllers.js";
//import isAdmin middleware to limit the access
import { isAdmin } from "../middleware/authentication.js";

router.get("/loggedUser", loggedUser);
router.get("/appStats", isAdmin("admin"), appStats);

export default router;
