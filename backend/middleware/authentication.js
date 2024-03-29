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
    // const guestUser = req.user.userId === "65e9851ff83744e33f89553e"; //returns a boolean if logged user is guestUser
    // req.user.guestUser === guestUser;
    console.log(req.user);
  } catch (err) {
    throw new ExpressError(err, 400);
  }
  next();
};

//isAdmin middleware
export const isAdmin = (...roles) => {
  //rest (...roles) will return all values of roles in an array
  return (req, res, next) => {
    //check whether the role of the logged in user (req.user.role) is included in the roles that was passed as an argument in the isAdmin function
    const adminUser = roles.includes(req.user.role); //returns a boolean
    if (!adminUser) {
      throw new ExpressError("User is not an admin");
    }
    next();
  };
};

//middlware to check if user is guest user (test user)
export const isGuestUser = (req, res, next) => {
  if (req.user.userId == "65e9851ff83744e33f89553e") {
    //id of test user in the database.
    throw new ExpressError("User is not authorized", 400);
  }
  next();
};

// export const recipeAuthor = (req,res,next)=> {
//   if(req.user.userId !== )
//   next()
// }
