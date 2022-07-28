import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import DataBaseError from "../controlers/errors/dataBaseError";
import ForbiddenError from "../controlers/errors/forbiddenError";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof DataBaseError) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  } else if (error instanceof ForbiddenError) {
    res.sendStatus(StatusCodes.FORBIDDEN);
  } else {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export default errorHandler;
