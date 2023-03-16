import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (
  err: { name: string; status?: number; message?: string } | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = "Internal Server Error";
  let status = 500;

  if (err.name === "Already verified") {
    message = err.name;
    status = 400;
  } else if (err.name === "Error") {
    message = err.message as string;
    status = 401;
  }

  if (err) res.status(status).json({ message });
};
