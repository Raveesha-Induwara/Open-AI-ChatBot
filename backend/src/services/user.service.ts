import { Request, Response, NextFunction } from "express";
import User from "../models/user.schema.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Ok", users });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: "Something went wrong", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email is not registered" });
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Clear existing cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    // Generate token
    const token = createToken(user._id.toString(), user.email, "7d");
    //const expire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // Set new cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true,
    });

    return res.status(200).json({ message: "Login Success" });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: "Something went wrong", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Clear existing cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    // Generate token
    const token = createToken(user._id.toString(), user.email, "7d");
    //const expire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // Set new cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "Success", _id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: "Something went wrong", cause: error.message });
  }
};