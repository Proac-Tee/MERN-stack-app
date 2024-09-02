"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create a Schema for subcategories.
const subcategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
// Create a Schema corresponding to the document interface.
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        name: { type: String, required: true },
        subcategories: [subcategorySchema],
    },
    createdAt: { type: Date, default: Date.now },
});
// Create a Model.
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
