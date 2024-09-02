"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("./errors");
const errorHandler = (err, req, res, next) => {
    // Handle ValidationError specifically
    if (err instanceof errors_1.ValidationError) {
        return res.status(err.status).json({
            status: "fail",
            message: err.message,
            data: err.errorData,
        });
    }
    // Handle other instances of BaseError
    if (err instanceof errors_1.BaseError) {
        if (err.isOperational) {
            return res.status(err.status).json({
                status: err.status >= 400 && err.status < 500 ? "fail" : "error",
                message: err.message,
            });
        }
        else {
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
exports.errorHandler = errorHandler;
