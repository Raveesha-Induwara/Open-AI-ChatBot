import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string, expireIn: string) => {
  const payLoad = { id, email };
  const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
    expiresIn: expireIn,
  });
  return token;
};
