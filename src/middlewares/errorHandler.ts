import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (
  err: { name: string; status?: number; message?: string } | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message: string;
  let status: number;

  switch (err.name) {
    case "Already verified":
      message = err.name;
      status = 400;
      break;
    case "Error":
      message = err.message as string;
      status = 401;
      break;
    case "Forbidden":
      message = err.name;
      status = 403;
      break;
    default:
      message = "Internal Server Error";
      status = 500;
  }

  res.status(status).json({ message });
};
