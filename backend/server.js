import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//instantiate express
const app = express();

//parse json
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
