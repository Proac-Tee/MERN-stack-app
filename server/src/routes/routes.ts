import { Router } from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getSingleProductDetails,
  updateProduct,
} from "../controller/controller";
import authenticateToken from "../auntenticateToken";

const router = Router();

// GET request to fetch all products
router.get("/products", getAllProducts);

// GET request to fetch product details by ID
router.get("/product/:_id", getSingleProductDetails);

// POST request to create a new product
router.post("/product", addNewProduct);

// PUT request to update product details by ID
router.put("/product/:_id", updateProduct);

// DELETE request to delete product by ID
router.delete("/product/:_id", deleteProduct);

export { router };
