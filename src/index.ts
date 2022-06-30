import express, { Request, Response, NextFunction } from "express";

const app = express();

app.get("/init", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: "bar" });
});

app.listen(3333, () => {
  console.log("a api está executando na port 3333");
});
