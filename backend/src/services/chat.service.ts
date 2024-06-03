import { Request, Response, NextFunction } from "express";
import User from "../models/user.schema.js";
import { configureOpenAI } from "../configs/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not registered or token malfunctioned" });
    }

    // grab the user's chat history from DB
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    // Add the new message to the chat history
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // send all the chat history with new one to openAI API
    const config = configureOpenAI();
    const openAI = new OpenAIApi(config);

    // get latest the response from openAI API
    const chatResponse = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    // save the response to the user's chat history
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const fetchAllChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user is logged in
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not registered or token malfunctioned" });
    }
    // Check if user is the same as the token
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permission didn't match" });
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user is logged in
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not registered or token malfunctioned" });
    }
    // Check if user is the same as the token
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permission didn't match" });
    }
    // @ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "Delete chat history" });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
