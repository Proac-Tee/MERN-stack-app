"use server";

import { ProductSchema } from "../utils/types";

const backend_uri = process.env.BACKEND_URI;

export const getProductsData = async () => {
  // Fetch data from the backend server
  const response = await fetch(`${backend_uri}/api/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Parse the response as JSON
  const data = await response.json();

  // Return the fetched data
  return data;
};

export const addProduct = async (formData: FormData) => {
  try {
    // Extract data from FormData
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const categoryName = formData.get("category")?.toString();
    const subcategories = formData
      .getAll("subcategories[]")
      .map((sub) => ({ name: sub.toString() }));
    const file = formData.get("file") as File | null;

    const productData = {
      name,
      description,
      category: {
        name: categoryName,
        subcategories,
      },
      file,
    };

    // Validate the data using Zod
    const result = ProductSchema.safeParse(productData);

    if (!result.success) {
      let errorMessages: { [key: string]: string } = {};

      // Map validation errors to a more usable format for frontend
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join(".");
        errorMessages[fieldName] = issue.message;
      });

      return {
        success: false,
        errors: errorMessages,
      };
    }

    return {
      success: true,
      message: "Product added successfully!",
      productData,
    };
  } catch (error) {
    return { success: false, message: "Failed to add product", error };
  }
};
