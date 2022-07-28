import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import ModelUser from "../controlers/modelUser";

const userRoute = Router();

userRoute.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await ModelUser.allUsers();
    res.status(StatusCodes.OK).send(users);
  }
);

userRoute.get(
  "/users/:uuid",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.uuid;

    const user = await ModelUser.getByIdUser(id);
    res.status(StatusCodes.OK).send({ userId: user.uuid });
  }
);

userRoute.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const uuid = await ModelUser.create(body);
    res.status(StatusCodes.CREATED).send({ userId: uuid });
  }
);

userRoute.put(
  "/users/:uuid",
  async (req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
    const id = req.params.uuid;
    const body = req.body;

    body.uuid = id;
    await ModelUser.updateUser(body);
    res.status(StatusCodes.OK).send();
  }
);

userRoute.delete(
  "/users/:uuid",
  async (req: Request, res: Response<{ uuid: string }>, next: NextFunction) => {
    const id = req.params.uuid;
    await ModelUser.deleteUser(id);
    res.status(StatusCodes.OK).send();
  }
);

export default userRoute;
