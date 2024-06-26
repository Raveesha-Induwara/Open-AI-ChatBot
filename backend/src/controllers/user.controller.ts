import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../services/user.service.js";
import {validate, loginValidator, signupValidator} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/logout", verifyToken, userLogout);
userRoutes.get("/auth-status", verifyToken, verifyUser);
export default userRoutes;
