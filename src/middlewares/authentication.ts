import { NextFunction, Request, Response } from "express";
import Encryption from "../helpers/jwt";

export const authentication = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { message: "Forbidden" };

    const token = Encryption.verifyToken(access_token as string);

    if (!token) throw { name: "Forbidden" };

    req.user = token;
    next();
  } catch (err) {
    next(err);
  }
};
