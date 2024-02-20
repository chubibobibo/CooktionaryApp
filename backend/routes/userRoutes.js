import express from "express";
//import controllers
import {
  userRegister,
  userLogin,
  userLogout,
} from "../controllers/userControllers.js";
const router = express.Router();

//input validation
import {
  validateRegister,
  validateLogin,
} from "../middleware/inputValidation.js";

router.post("/register", validateRegister, userRegister);
router.post("/login", validateLogin, userLogin);
router.get("/logout", userLogout);

export default router;
