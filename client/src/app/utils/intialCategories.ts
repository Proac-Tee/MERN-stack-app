import { ICategory } from "./types";

// Define the initial categories with all the categories you provided
export const initialCategories: ICategory[] = [
  {
    name: "Electronics",
    subcategories: [
      { name: "Mobile devices", selected: false },
      { name: "Computers & peripherals", selected: false },
      { name: "Audio & video equipment", selected: false },
      { name: "Home appliances", selected: false },
    ],
  },
  {
    name: "Apparel & Accessories",
    subcategories: [
      { name: "Men's, women's, and children's clothing", selected: false },
      { name: "Footwear", selected: false },
      { name: "Bags and luggage", selected: false },
      { name: "Fashion accessories", selected: false },
    ],
  },
  {
    name: "Health & Beauty",
    subcategories: [
      { name: "Cosmetics", selected: false },
      { name: "Personal care products", selected: false },
      { name: "Healthcare products", selected: false },
      { name: "Fitness equipment", selected: false },
    ],
  },
  {
    name: "Home & Garden",
    subcategories: [
      { name: "Furniture", selected: false },
      { name: "Home décor", selected: false },
      { name: "Kitchenware", selected: false },
      { name: "Gardening tools", selected: false },
    ],
  },
  {
    name: "Automotive",
    subcategories: [
      { name: "Car parts and accessories", selected: false },
      { name: "Tools & equipment", selected: false },
      { name: "Maintenance products", selected: false },
      { name: "Motorcycle parts", selected: false },
    ],
  },
  {
    name: "Food & Beverage",
    subcategories: [
      { name: "Packaged foods", selected: false },
      { name: "Beverages", selected: false },
      { name: "Confectionery", selected: false },
      { name: "Health foods", selected: false },
    ],
  },
  {
    name: "Office Supplies",
    subcategories: [
      { name: "Stationery", selected: false },
      { name: "Office furniture", selected: false },
      { name: "Electronics", selected: false },
      { name: "Cleaning supplies", selected: false },
    ],
  },
  {
    name: "Toys & Games",
    subcategories: [
      { name: "Educational toys", selected: false },
      { name: "Puzzles", selected: false },
      { name: "Video games", selected: false },
      { name: "Outdoor play equipment", selected: false },
    ],
  },
  {
    name: "Industrial & Scientific",
    subcategories: [
      { name: "Machinery", selected: false },
      { name: "Tools and instruments", selected: false },
      { name: "Safety equipment", selected: false },
      { name: "Lab supplies", selected: false },
    ],
  },
  {
    name: "Sports & Outdoors",
    subcategories: [
      { name: "Sports equipment", selected: false },
      { name: "Camping gear", selected: false },
      { name: "Outdoor clothing", selected: false },
      { name: "Fitness gear", selected: false },
    ],
  },
];
