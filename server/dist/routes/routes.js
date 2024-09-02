"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controller_1 = require("../controller/controller");
const router = (0, express_1.Router)();
exports.router = router;
// GET request to fetch all products
router.get("/products", controller_1.getAllProducts);
// GET request to fetch product details by ID
router.get("/product/:_id", controller_1.getSingleProductDetails);
// POST request to create a new product
router.post("/product", controller_1.addNewProduct);
// PUT request to update product details by ID
router.put("/product/:_id", controller_1.updateProduct);
// DELETE request to delete product by ID
router.delete("/product/:_id", controller_1.deleteProduct);
