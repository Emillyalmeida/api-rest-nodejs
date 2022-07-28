import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ModelUser from "../controlers/modelUser";
import JWT from "jsonwebtoken";

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

    const jwtPayload = { username: user.username };
    const jwtOptions = { subject: user?.uuid };
    const secretKey = "my_secret_key";

    const token = JWT.sign(jwtPayload, secretKey, jwtOptions);
    res.status(StatusCodes.OK).json({ user: user, token: token });
  }
);

export default authRoute;
