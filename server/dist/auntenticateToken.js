"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const errors_1 = require("./middlewares/errors");
dotenv_1.default.config();
// Secret key for JWT
const secretKey = process.env.SECRET_KEY || "";
const authenticateToken = (request, response, next) => {
    const authHeader = request.headers["authorization"];
    if (!authHeader?.startsWith("Bearer")) {
        return next(new errors_1.BaseError("Unauthorized Request", 401));
    }
    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, secretKey, (error, decoded) => {
        console.log(token);
        if (error) {
            if (error.name === "JsonWebTokenError") {
                return next(new errors_1.BaseError("Request is Forbidden", 403));
            }
            return next(new errors_1.BaseError("Failed to verify token", 500, false));
        }
        // Assign the user to the request object
        request.user = decoded;
        next();
    });
};
exports.default = authenticateToken;
