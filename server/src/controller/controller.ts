import { NextFunction, Request, Response } from "express";
import Product from "../schema/ProductSchema";
import { NotFoundError, ValidationError } from "../middlewares/errors";

interface IProductId {
  _id: string;
}

/**
 * Controller function to add a new product to the database
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const addNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, category } = req.body;

  // Validate srequired fields
  const errors: Record<string, string>[] = [];
  if (!name) errors.push({ field: "name", message: "Name is required!" });
  if (!description)
    errors.push({ field: "description", message: "Description is required!" });
  if (
    !category ||
    typeof category !== "object" ||
    !category.name ||
    !Array.isArray(category.subcategories)
  ) {
    errors.push({
      field: "category",
      message:
        "Category must be an object with a name and an array of subcategories!",
    });
  } else {
    // Validate subcategories
    category.subcategories.forEach((subcategory: any, index: number) => {
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
    return next(new ValidationError(errors));
  }

  // Create a new Product document
  const newProduct = new Product({
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
    const productId = (result as IProductId)._id.toString();

    // Respond with 201 status code and success message
    res.status(201).json({
      message: "Successfully added new Product",
      productId,
    });
  } catch (error) {
    // Handle any errors that occur during the database operation
    next(error);
  }
};

/**
 * Controller function to get all products
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find().exec();

    // Respond with 200 status code and the retrieved products
    res.status(200).json(products);
  } catch (error) {
    // Handle any errors that occur during database operation
    next(error); // Forward the error to the centralized error handler
  }
};

/**
 * Controller function to get an individual product detail by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const getSingleProductDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract ID from request parameters
  const { _id } = req.params;

  try {
    // Find the product in the database by ID
    const matchedProduct = await Product.findById(_id).exec();

    // Check if product was found
    if (!matchedProduct) {
      // If product was not found, throw a NotFoundError
      return next(new NotFoundError("Product not found"));
    }

    // If product was found, respond with product data
    res.status(200).json(matchedProduct);
  } catch (error) {
    // Handle any errors that occur during database operation
    next(error); // Forward the error to the centralized error handler
  }
};
/**
 * Controller function to update a product by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract ID from request parameters
  const { _id } = req.params;

  // Extract product data from request body
  const { name, description, category } = req.body;

  // Validate required fields
  const errors: Record<string, string>[] = [];
  if (!name) errors.push({ field: "name", message: "Name is required!" });
  if (!description)
    errors.push({ field: "description", message: "Description is required!" });
  if (
    !category ||
    typeof category !== "object" ||
    !category.name ||
    !Array.isArray(category.subcategories)
  ) {
    errors.push({
      field: "category",
      message:
        "Category must be an object with a name and an array of subcategories!",
    });
  } else {
    // Validate subcategories
    category.subcategories.forEach((subcategory: any, index: number) => {
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
    return next(new ValidationError(errors));
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
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      newProduct, // Directly use the product object for update
      { new: true } // Return the updated document
    ).exec();

    // Check if the product was found and updated successfully
    if (!updatedProduct) {
      // If the product was not found, throw a NotFoundError
      return next(new NotFoundError(`Product with ID: ${_id} not found`));
    }

    // Respond with success message if the product was updated
    res.status(200).json({ message: "Successfully updated", updatedProduct });
  } catch (error) {
    // Forward any errors to the centralized error handler
    next(error);
  }
};

/**
 * Controller function to delete a product by ID
 * @param request - Express Request object
 * @param response - Express Response object
 */
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract ID from request parameters
  const { _id } = req.params;

  try {
    // Find and delete the Product by ID
    const deletedProduct = await Product.findByIdAndDelete(_id).exec();

    // Check if Product was found and deleted successfully
    if (!deletedProduct) {
      // If the product was not found, throw a NotFoundError
      return next(new NotFoundError(`Product with ID: ${_id} not found`));
    }

    // Respond with success message if Product was deleted
    res.status(200).json({
      message: "Successfully deleted Product",
    });
  } catch (error) {
    // Forward any errors to the centralized error handler
    next(error);
  }
};
