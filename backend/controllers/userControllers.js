//express-async-errors
import "express-async-errors";
//throw ExpressErrors
import { ExpressError } from "../errors/ExpressError.js";
import mongoose from "mongoose";
import { UserModel } from "../models/UserSchema.js";

//register
export const userRegister = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data found", 404);
  }
  //check if first entry = admin
  const isAdmin = await UserModel.countDocuments(0);
  //create a new property for role
  req.body.role = isAdmin === 0 ? "admin" : "user";
  const newUser = await UserModel.create(req.body);
  if (!newUser) {
    throw new ExpressError("Cannot create user");
  }
  res.status(200).json({ message: "New user registered", newUser });
};
