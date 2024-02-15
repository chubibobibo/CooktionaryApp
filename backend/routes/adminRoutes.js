import express from "express";
import { Router } from "express";
const router = express.Router();

//import controller
import { loggedUser, appStats } from "../controllers/adminControllers.js";

router.get("/loggedUser", loggedUser);
router.get("/appStats", appStats);

export default router;
