"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProductDetails = exports.getAllProducts = exports.addNewProduct = void 0;
const ProductSchema_1 = __importDefault(require("../schema/ProductSchema"));
const errors_1 = require("../middlewares/errors");
/**
 * Controller function to add a new product to the database
 * @param request - Express Request object
 * @param response - Express Response object
 */
const addNewProduct = async (req, res, next) => {
    const { name, description, category } = req.body;
    // Validate srequired fields
    const errors = [];
    if (!name)
        errors.push({ field: "name", message: "Name is required!" });
    if (!description)
        errors.push({ field: "description", message: "Description is required!" });
    if (!category ||
        typeof category !== "object" ||
        !category.name ||
        !Array.isArray(category.subcategories)) {
        errors.push({
            field: "category",
            message: "Category must be an object with a name and an array of subcategories!",
        });
    }
    else {
        // Validate subcategories
        category.subcategories.forEach((subcategory, index) => {
            if (typeof subcategory !== "object" || !subcategory.name) {
                errors.push({
                    field: `category.subcategories[${index}]`,
                    message: "Each subcategory must be an object with a name!",
                });
            }
        });
    }
    // If there are validation errors, pass them to the next middleware
    if (errors.length > 0) {
        return next(new errors_1.ValidationError(errors));
    }
    // Create a new Product document
    const newProduct = new ProductSchema_1.default({
        name,
        description,
        category: {
            name: category.name,
            subcategories: category.subcategories,
        },
    });
    try {
        // Save the new product to the database
        const result = await newProduct.save();
        // Cast _id to string
        const productId = result._id.toString();
        // Respond with 201 status code and success message
        res.status(201).json({
            message: "Successfully added new Product",
            productId,
        });
    }
    catch (error) {
        // Handle any errors that occur during the database operation
        next(error);
    }
};
exports.addNewProduct = addNewProduct;
/**
 * Controller function to get all products
 * @param request - Express Request object
 * @param response - Express Response object
 */
const getAllProducts = async (req, res, next) => {
    try {
        // Retrieve all products from the database
        const products = await ProductSchema_1.default.find().exec();
        // Respond with 200 status code and the retrieved products
        res.status(200).json(products);
    }
    catch (error) {
        // Handle any errors that occur during database operation
        next(error); // Forward the error to the centralized error handler
    }
};
exports.getAllProducts = getAllProducts;
/**
 * Controller function to get an individual product detail by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
const getSingleProductDetails = async (req, res, next) => {
    // Extract ID from request parameters
    const { _id } = req.params;
    try {
        // Find the product in the database by ID
        const matchedProduct = await ProductSchema_1.default.findById(_id).exec();
        // Check if product was found
        if (!matchedProduct) {
            // If product was not found, throw a NotFoundError
            return next(new errors_1.NotFoundError("Product not found"));
        }
        // If product was found, respond with product data
        res.status(200).json(matchedProduct);
    }
    catch (error) {
        // Handle any errors that occur during database operation
        next(error); // Forward the error to the centralized error handler
    }
};
exports.getSingleProductDetails = getSingleProductDetails;
/**
 * Controller function to update a product by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
const updateProduct = async (req, res, next) => {
    // Extract ID from request parameters
    const { _id } = req.params;
    // Extract product data from request body
    const { name, description, category } = req.body;
    // Validate required fields
    const errors = [];
    if (!name)
        errors.push({ field: "name", message: "Name is required!" });
    if (!description)
        errors.push({ field: "description", message: "Description is required!" });
    if (!category ||
        typeof category !== "object" ||
        !category.name ||
        !Array.isArray(category.subcategories)) {
        errors.push({
            field: "category",
            message: "Category must be an object with a name and an array of subcategories!",
        });
    }
    else {
        // Validate subcategories
        category.subcategories.forEach((subcategory, index) => {
            if (typeof subcategory !== "object" || !subcategory.name) {
                errors.push({
                    field: `category.subcategories[${index}]`,
                    message: "Each subcategory must be an object with a name!",
                });
            }
        });
    }
    // If there are validation errors, pass them to the next middleware
    if (errors.length > 0) {
        return next(new errors_1.ValidationError(errors));
    }
    // Create a new Product document
    const newProduct = {
        name,
        description,
        category: {
            name: category.name,
            subcategories: category.subcategories,
        },
    };
    try {
        // Find and update the Product by ID
        const updatedProduct = await ProductSchema_1.default.findByIdAndUpdate(_id, newProduct, // Directly use the product object for update
        { new: true } // Return the updated document
        ).exec();
        // Check if the product was found and updated successfully
        if (!updatedProduct) {
            // If the product was not found, throw a NotFoundError
            return next(new errors_1.NotFoundError(`Product with ID: ${_id} not found`));
        }
        // Respond with success message if the product was updated
        res.status(200).json({ message: "Successfully updated", updatedProduct });
    }
    catch (error) {
        // Forward any errors to the centralized error handler
        next(error);
    }
};
exports.updateProduct = updateProduct;
/**
 * Controller function to delete a product by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
const deleteProduct = async (req, res, next) => {
    // Extract ID from request parameters
    const { _id } = req.params;
    try {
        // Find and delete the Product by ID
        const deletedProduct = await ProductSchema_1.default.findByIdAndDelete(_id).exec();
        // Check if Product was found and deleted successfully
        if (!deletedProduct) {
            // If the product was not found, throw a NotFoundError
            return next(new errors_1.NotFoundError(`Product with ID: ${_id} not found`));
        }
        // Respond with success message if Product was deleted
        res.status(200).json({
            message: "Successfully deleted Product",
        });
    }
    catch (error) {
        // Forward any errors to the centralized error handler
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
