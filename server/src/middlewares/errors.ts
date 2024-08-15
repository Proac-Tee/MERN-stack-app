// Base error class
export class BaseError extends Error {
  public readonly status: number;
  public readonly isOperational: boolean;

  constructor(message: string, status: number, isOperational = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // Capture the stack trace and exclude the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

// 404 Not Found error class
export class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

// Validation error class
export class ValidationError extends BaseError {
  public readonly errorData: Record<string, string>[];

  constructor(errorData: Record<string, string>[]) {
    super("Validation Error", 400);
    this.errorData = errorData;
  }
}
