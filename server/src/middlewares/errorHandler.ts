import { Request, Response, NextFunction } from "express";
import { BaseError, ValidationError } from "./errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle ValidationError specifically
  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      status: "fail",
      message: err.message,
      data: err.errorData,
    });
  }

  // Handle other instances of BaseError
  if (err instanceof BaseError) {
    if (err.isOperational) {
      return res.status(err.status).json({
        status: err.status >= 400 && err.status < 500 ? "fail" : "error",
        message: err.message,
      });
    } else {
      // Log the error for non-operational errors (e.g., programming errors)
      console.error("Non-operational error:", err);

      // Send a generic error response
      return res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }

  // Log and handle any other unhandled errors (e.g., programming bugs)
  console.error("Unexpected error:", err);

  // Send a generic error response
  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
