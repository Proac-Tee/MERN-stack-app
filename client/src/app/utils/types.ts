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
