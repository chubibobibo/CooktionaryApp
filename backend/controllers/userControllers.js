//express-async-errors
import "express-async-errors";
//throw ExpressErrors
import { ExpressError } from "../errors/ExpressError.js";
import mongoose from "mongoose";
import { UserModel } from "../models/UserSchema.js";
//bcrypt to hash pswd.
import bcrypt from "bcrypt";

//register
export const userRegister = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data found", 404);
  }
  //check if first entry = admin
  const isAdmin = await UserModel.countDocuments(0);
  //create a new property for role
  req.body.role = isAdmin === 0 ? "admin" : "user";
  //hashing a password
  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt); //accepts the password from the form(req.body) and the salt round created.
  req.body.password = hashedPassword;
  const newUser = await UserModel.create(req.body);
  console.log(newUser);
  if (!newUser) {
    throw new ExpressError("Cannot create user");
  }
  res.status(200).json({ message: "New user registered", newUser });
};

//logging in
export const userLogin = (req, res) => {};
