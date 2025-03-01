import { Request, Response, NextFunction } from "express";
import { AppError, InternalServerError } from "../utils/errors";

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errorResponse = new InternalServerError();

  if (err instanceof AppError) {
    errorResponse = err;
  }

  res.status(errorResponse.code).json({
    success: false,
    status: errorResponse.status,
    message: errorResponse.message,
  });
}
