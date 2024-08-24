import React from "react";
import Product from "../components/ProductPage/Product";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProductsData } from "../action/actions";

const ProductPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
  });
  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="min-h-[100vh] h-[100%] w-[100%]">
        <Product />
      </section>
    </HydrationBoundary>
  );
};

export default ProductPage;
