import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ModelUser from "../models/modelUser";

const authRoute = Router();

authRoute.post(
  "/auth",
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return "erro credential not validas";
    }

    const user = await ModelUser.findBynameAndPassword({ username, password });

    if (!user) {
      return "erro invalid credential";
    }
  }
);

export default authRoute;
