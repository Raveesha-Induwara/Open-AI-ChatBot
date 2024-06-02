import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expireIn: string) => {
  const payLoad = { id, email };
  const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
    expiresIn: expireIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  //console.log(token);
  // if token is not present
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  // if token is present
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err: any, success: any) => {
      if (err) {
        reject(err);
        return res.status(401).json({ message: "Token Expired" });
      }
      //console.log("Token verification successful");
      resolve();
      res.locals.jwtData = success;
      return next();
    });
  })
};
