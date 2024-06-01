import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./db/connection.js";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

config({ path: ".env.local" });
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
app.use(morgan("dev")); // remove it in production

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
