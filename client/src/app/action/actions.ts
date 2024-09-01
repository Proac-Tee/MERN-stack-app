"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProductSchema, UpdateProductSchema } from "../utils/types";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

const backend_uri = process.env.BACKEND_URI;

export const getProductsData = async () => {
  const { getAccessTokenRaw } = getKindeServerSession();
  const accessToken = await getAccessTokenRaw();

  // Fetch data from the backend server
  const response = await fetch(`${backend_uri}/api/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Parse the response as JSON
  const data = await response.json();

  // Return the fetched data
  return data;
};

export const getProductsFiles = async () => {
  const response = await utapi.listFiles();
  // Ensure that the response is a plain object or array
  const plainResponse = JSON.parse(JSON.stringify(response)); // This removes any class instances or prototypes
  return plainResponse;
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

export const updateProduct = async (formData: FormData) => {
  try {
    // Extract data from FormData
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const categoryName = formData.get("category")?.toString();
    const subcategories = formData
      .getAll("subcategories[]")
      .map((sub) => ({ name: sub.toString() }));

    const productData = {
      name,
      description,
      category: {
        name: categoryName,
        subcategories,
      },
    };

    // Validate the data using Zod
    const result = UpdateProductSchema.safeParse(productData);

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

export const deteteProductData = async (_id: string, fileKey: string) => {
  const { getAccessTokenRaw } = getKindeServerSession();
  const accessToken = await getAccessTokenRaw();

  try {
    // Fetch data from the backend server
    const response = await fetch(`${backend_uri}/api/product/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Ensure that the response is a plain object or array
    const data = JSON.parse(JSON.stringify(response)); // This removes any class instances or prototypes

    await utapi.deleteFiles(fileKey);

    console.log(data);

    return {
      success: true,
      message: "Product deleted successfully!",
    };
  } catch (error) {
    return { success: false, message: "Failed to delete product", error };
  }
};
