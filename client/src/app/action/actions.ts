"use server";

const backend_uri = process.env.BACKEND_URI;

export const getProductsData = async () => {
  // Fetch data from the backend server
  const response = await fetch(`${backend_uri}/api/products`);

  // Parse the response as JSON
  const data = await response.json();

  // Return the fetched data
  return data;
};
