import React from "react";

type Product = {
  name: string;
  description: string;
  category: string;
  createdAt: Date;
};

type ProductGridProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {products.map((product, index) => (
          <>
            <div key={index} className="cursor-pointer">
              <div className="bg-gray-100 px-[1rem] w-[200px] h-[200px]"></div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
