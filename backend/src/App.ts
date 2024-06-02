import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./db/connection.js";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({ path: ".env.local" });
const app = express();

// middlewares
app.use(express.json())
app.use(morgan("dev")); // remove it in production
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);

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
