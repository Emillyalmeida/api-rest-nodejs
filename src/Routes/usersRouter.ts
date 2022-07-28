import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ModelUser from "../controlers/modelUser";
import bearerAuthMiddle from "../middlewares/bearerAuthMiddle";

const userRoute = Router();

userRoute.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await ModelUser.allUsers();
      res.status(StatusCodes.OK).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userRoute.get(
  "/users/:uuid",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.uuid;

      const user = await ModelUser.getByIdUser(id);
      res.status(StatusCodes.OK).send({ userId: user.uuid });
    } catch (error) {
      next(error);
    }
  }
);

userRoute.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const uuid = await ModelUser.create(body);
      res.status(StatusCodes.CREATED).send({ userId: uuid });
    } catch (error) {
      next(error);
    }
  }
);

userRoute.put(
  "/users/:uuid",
  async (req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
    try {
      const id = req.params.uuid;
      const body = req.body;

      body.uuid = id;
      await ModelUser.updateUser(body);
      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  }
);

userRoute.delete(
  "/users/:uuid",
  bearerAuthMiddle,
  async (req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
    try {
      const id = req.params.uuid;
      await ModelUser.deleteUser(id);
      res.status(StatusCodes.OK).send();
    } catch (error) {
      next(error);
    }
  }
);

export default userRoute;
