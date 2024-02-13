import express from "express";
//import controllers
import { userRegister, userLogin } from "../controllers/userControllers.js";
const router = express.Router();

//input validation
import { validateRegister } from "../middleware/inputValidation.js";

router.post("/register", validateRegister, userRegister);
router.post("/login", userLogin);

export default router;
