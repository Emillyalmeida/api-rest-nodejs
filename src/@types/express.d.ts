import User from "../models/userInterface";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
