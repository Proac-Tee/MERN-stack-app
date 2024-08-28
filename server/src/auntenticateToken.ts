import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BaseError } from "./middlewares/errors";

dotenv.config();

// Secret key for JWT
const secretKey = process.env.SECRET_KEY || "";

// Define a custom interface extending Request to include the user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticateToken = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers["authorization"];

  if (!authHeader?.startsWith("Bearer")) {
    return next(new BaseError("Unauthorized Request", 401));
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (error, decoded) => {
    console.log(token);

    if (error) {
      if (error.name === "JsonWebTokenError") {
        return next(new BaseError("Request is Forbidden", 403));
      }
      return next(new BaseError("Failed to verify token", 500, false));
    }

    // Assign the user to the request object
    request.user = decoded;
    next();
  });
};

export default authenticateToken;
