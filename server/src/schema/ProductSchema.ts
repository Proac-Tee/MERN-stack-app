import { Document, model, Schema } from "mongoose";

// Define a TypeScript interface for Subcategories.
interface ISubcategory {
  name: string;
}

// Define a TypeScript interface representing a document in MongoDB.
export interface IProduct extends Document {
  name: string;
  description: string;
  category: {
    name: string;
    subcategories: ISubcategory[];
  };
  createdAt: Date;
}

// Create a Schema for subcategories.
const subcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
});

// Create a Schema corresponding to the document interface.
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    name: { type: String, required: true },
    subcategories: [subcategorySchema],
  },
  createdAt: { type: Date, default: Date.now },
});

// Create a Model.
const Product = model<IProduct>("Product", productSchema);

export default Product;
