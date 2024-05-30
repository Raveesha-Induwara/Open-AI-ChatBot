import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./db/connection.js";

config({ path: ".env.local" });
const app = express();

// middlewares
app.use(express.json());

// connection and listeners
const PORT = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server is running on port 5000 & connected to DB 🤟")
    );
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });