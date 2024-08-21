import React, { FC } from "react";
import Product from "../components/ProductPage/Product";

const Products: FC = () => {
  return (
    // <section className="min-h-[100vh] h-[100%] w-[100%] px-[1rem] md:px-[2rem] xl:px-[5rem] max-w-[1600px] mx-auto">
    //   <ProductGrid products={products} />
    // </section>
    <section>
      <Product />
    </section>
  );
};

export default Products;
