import express from "express";
import { Router } from "express";
const router = express.Router();

//import controller
import { loggedUser } from "../controllers/adminControllers.js";

router.get("/loggedUser", loggedUser);

export default router;
