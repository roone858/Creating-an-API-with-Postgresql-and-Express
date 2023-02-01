import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const tokenSecret = String(process.env.TOKEN_SECRET);

export const authorisation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
 
    const token = jwt.verify(String(req.headers.token), tokenSecret);
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};
