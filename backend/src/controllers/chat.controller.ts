import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { fetchAllChats, generateChatCompletion } from "../services/chat.service.js";

// Protected API
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion );
chatRoutes.get("/all-chats", verifyToken, fetchAllChats );

export default chatRoutes;
