import type { Product } from "../../types/product";

import ProductCard from "./ProductCard";

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export default function ProductSection({
  title,
  products,
}: ProductSectionProps) {
  return (
    <>
      <h1 className="title">{title}</h1>
      <div className="products">
        {products.map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>
    </>
  );
}
