//express-async-errors
import "express-async-errors";
//throw ExpressErrors
import { ExpressError } from "../errors/ExpressError.js";
import mongoose from "mongoose";
import { UserModel } from "../models/UserSchema.js";
//bcrypt to hash pswd.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register
export const userRegister = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data found", 404);
  }
  //check if first entry = admin
  const isAdmin = (await UserModel.countDocuments()) === 0; // returns a boolean
  //create a new property for role
  req.body.role = isAdmin ? "admin" : "user";
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
export const userLogin = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data provided", 400);
  }
  //find the user trying to login using the email from req.body
  const foundUser = await UserModel.findOne({ email: req.body.email });
  if (!foundUser) {
    throw new ExpressError("Username or password is wrong", 400);
  }
  const loggedUser = bcrypt.compareSync(req.body.password, foundUser.password); //password from form compared to the password of the foundUser.
  if (!loggedUser) {
    throw new ExpressError("Wrong email or password", 400);
  }
  //implement jwt tokens
  const token = jwt.sign(
    { userId: foundUser._id, role: foundUser.role },
    process.env.SECRET,
    { expiresIn: "7d" }
  );

  //create cookies based on the jwt
  res.cookie("recipeCookies", token, {
    httpOnly: true, //prevents access of cookies in clientside
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //1 week expiration
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: `Welcome ${foundUser.name}`, foundUser });
};

//logging out
export const userLogout = async (req, res) => {
  //create a new cookie that expires immediately
  res.cookie("recipeCookies", logout, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "user logged out" });
};
