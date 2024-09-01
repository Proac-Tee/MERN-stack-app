import { z } from "zod";

export interface ISubcategory {
  name: string;
  selected: boolean;
}

interface IExtractedSubcategory {
  name: string;
}

export interface ICategory {
  name: string;
  subcategories: ISubcategory[];
}

interface IExtractedCategory {
  name: string;
  subcategories: IExtractedSubcategory[];
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: ICategory;
  createdAt: Date;
}

export interface IError {
  status: string;
  message: string;
}

export type ProductGridProps = {
  products: IProduct[] | IError | null;
};

export interface ProductResponse {
  name: string;
  description: string;
  category: ICategory;
  file: File | null;
}

export interface ExtractedProductData {
  name: string;
  description: string;
  category: IExtractedCategory;
  file?: File; // Optional if not always required
}

export type SubCategory = {
  name: string;
  selected: boolean;
};

export type Category = {
  name: string;
  subcategories: SubCategory[];
};

// Zod validation schema for the product data
export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  category: z.object({
    name: z.string().min(1, "Category name is required"),
    subcategories: z
      .array(z.object({ name: z.string() }))
      .min(1, "At least one subcategory is required"),
  }),
  file: z.any(), // Handling file differently in the server action
});

// Zod validation schema for the product data
export const UpdateProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  category: z.object({
    name: z.string().min(1, "Category name is required"),
    subcategories: z
      .array(z.object({ name: z.string() }))
      .min(1, "At least one subcategory is required"),
  }),
});

// Define the type for each file object
export type FileType = {
  customId: string | null; // customId can be null or a string
  id: string; // id is a string
  key: string; // key is a string
  name: string; // name is a string
  status: "Uploaded"; // status is a string, specifically "Uploaded"
};

// Define the type for the array of files
export type FilesArrayType = {
  files: FileType[]; // Array of file objects
  hasMore: boolean; // hasMore is a boolean indicating if there are more files
};

export interface contactUsErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  messageContent?: string;
}

export const contactUsSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "first name must be at least 1 characters long.",
    })
    .max(100, {
      message: "first name must be at most 100 characters long.",
    }),

  lastName: z
    .string()
    .min(1, {
      message: "last name must be at least 1 characters long.",
    })
    .max(100, {
      message: "last name must be at most 100 characters long.",
    }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),

  messageContent: z
    .string()
    .min(30, {
      message: "content must be at least 30 characters long.",
    })
    .max(1000, {
      message: "content must be at most 1000 characters long.",
    }),
});
