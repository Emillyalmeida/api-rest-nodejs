import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ModelUser from "../controlers/modelUser";
import ForbiddenError from "../controlers/errors/forbiddenError";

const bearerAuthMiddle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais not found");
      return;
    }

    const [authorizationType, jwtToken] = authorizationHeader.split(" ");

    if (authorizationType !== "Bearer") {
      throw new ForbiddenError("Invalid authorization type");
    }

    if (!jwtToken) {
      throw new ForbiddenError("Invalid token");
    }

    const tokenPayload = JWT.verify(jwtToken, "my_secret_key");

    if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
      throw new ForbiddenError("Invalid token");
    }

    const user = { uuid: tokenPayload.sub, username: tokenPayload.username };
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default bearerAuthMiddle;
