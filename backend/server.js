import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//import routes
import userRoutes from "./routes/userRoutes.js";

//instantiate express
const app = express();

//parse json
app.use(express.json());

//connection DB
// getting-started.js
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

//routes
app.use("/api/users/", userRoutes);

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
