import { queryOptions } from "@tanstack/react-query";

const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URI;

export const productOptions = queryOptions({
  queryKey: ["product"],
  queryFn: async () => {
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
  },
});
