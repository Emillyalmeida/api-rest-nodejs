import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import errorHandler from "./middlewares/errorHandle";
import authRoute from "./Routes/authRouter";
import userRoute from "./Routes/usersRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);
app.use(authRoute);

app.get("/init", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: "bar" });
});

app.use(errorHandler);

app.listen(3333, () => {
  console.log("a api está executando na port 3333");
});
