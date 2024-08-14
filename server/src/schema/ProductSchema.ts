import { Document, model, Schema } from "mongoose";

// Define a TypeScript interface representing a document in MongoDB.
export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  createdAt: Date;
}

// Create a Schema corresponding to the document interface.
const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a Model.
const Product = model<IProduct>("Product", productSchema);

export default Product;
