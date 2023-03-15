import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (
  err: Error | { message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = "Internal Server Error";
  let status = 500;

  res.status(status).json({ message });
};
