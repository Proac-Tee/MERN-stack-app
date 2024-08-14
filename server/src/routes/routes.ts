import { Router } from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getSingleProductDetails,
  updateProduct,
} from "../controller/controller";

const router = Router();

// GET request to fetch all products
router.get("/products", getAllProducts);

// GET request to fetch product details by ID
router.get("/product/:id", getSingleProductDetails);

// POST request to create a new product
router.post("/product", addNewProduct);

// PUT request to update product details by ID
router.patch("/product/:id", updateProduct);

// DELETE request to delete product by ID
router.delete("/product/:id", deleteProduct);

export { router };
