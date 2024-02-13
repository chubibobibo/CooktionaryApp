import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

//import authorization middleware
import { authenticationMiddleware } from "./middleware/authentication.js";

//import routes
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

//instantiate express
const app = express();

//parse json
app.use(express.json());
//cookie parser
app.use(cookieParser());

//connection DB
// getting-started.js
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

//routes
app.use("/api/users/", userRoutes);
app.use("/api/recipes/", authenticationMiddleware, recipeRoutes);

//middleware for notfound page
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

//express error handler
app.use((err, req, res, next) => {
  const status = err.status || 404;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
