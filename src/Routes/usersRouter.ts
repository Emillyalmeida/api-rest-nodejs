import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const userRoute = Router();

userRoute.get("/users", (req: Request, res: Response, next: NextFunction) => {
  const users = [{ name: "emilly" }];
  res.status(StatusCodes.OK).send(users);
});

userRoute.get(
  "/users/:uuid",
  (req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
    const id = req.params.uuid;
    res.status(StatusCodes.OK).send();
  }
);

userRoute.post("/users", (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  res.status(StatusCodes.CREATED).send({ body });
});

export default userRoute;
