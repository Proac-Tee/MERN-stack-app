"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.NotFoundError = exports.BaseError = void 0;
// Base error class
class BaseError extends Error {
    constructor(message, status, isOperational = true) {
        super(message);
        this.status = status;
        this.isOperational = isOperational;
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;
        // Capture the stack trace and exclude the constructor call from it
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseError = BaseError;
// 404 Not Found error class
class NotFoundError extends BaseError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
// Validation error class
class ValidationError extends BaseError {
    constructor(errorData) {
        super("Validation Error", 400);
        this.errorData = errorData;
    }
}
exports.ValidationError = ValidationError;
