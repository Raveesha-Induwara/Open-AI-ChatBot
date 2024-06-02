import { Router } from "express";
import userRoutes from "../controllers/user.controller.js";
import chatRoutes from "../controllers/chat.controller.js";

const appRouter = Router();
appRouter.use('/user', userRoutes); // domain/api/v1/user
appRouter.use('/chat', chatRoutes); // domain/api/v1/chat

export default appRouter;
