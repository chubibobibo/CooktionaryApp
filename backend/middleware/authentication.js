//obtain cookies then verify the jwt.
//install cookie-parser and instantiate it as middleware in backend entrypoint (server.js)
import jwt from "jsonwebtoken";
import { ExpressError } from "../errors/ExpressError.js";

export const authenticationMiddleware = (req, res, next) => {
  //accessing the cookies created to be used in the verification of jwt
  //NOTE: recipeCookies contains the token (jwt)
  const { recipeCookies } = req.cookies;
  if (!recipeCookies) {
    throw new ExpressError("User not authenticated", 400);
  }
  try {
    //pass the cookie created to verify and save it to a variable
    req.user = jwt.verify(recipeCookies, process.env.SECRET);
    console.log(req.user);
    next();
  } catch (err) {
    throw new ExpressError(err, 400);
  }
};
