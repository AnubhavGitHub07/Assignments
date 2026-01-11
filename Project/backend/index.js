import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthController from "../backend/controllers/AuthController.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

//mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error connecting db", err);
  });

app.use("/auth/api", AuthController);

//dummy route
app.get("/", (req, res) => {
  res.end("hi from server");
});

app.listen(PORT, () => {
  console.log(`server is running on localhost:${PORT}`);
});