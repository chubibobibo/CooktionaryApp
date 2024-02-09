import mongoose from "mongoose";
import { UserModel } from "../models/UserSchema.js";

//register
export const userRegister = async (req, res) => {
  if (!req.body) {
    res.status(404).json({ message: "No data found" });
  }
  //check if first entry = admin
  const isAdmin = await UserModel.countDocuments(0);
  //create a new property for role
  req.body.role = isAdmin === 0 ? "admin" : "user";
  try {
    const newUser = await UserModel.create(req.body);
    res.status(200).json({ message: "New user registered" });
  } catch (err) {
    console.log(err);
  }
};
