import type { Product } from "../../types/product";
import Loading from "../../ui/Loading";

import ProductCard from "./ProductCard";

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export default function ProductSection({
  title,
  products,
}: ProductSectionProps) {
  if (products.length == 0) return <Loading />;

  return (
    <>
      {title ? <h1 className="title">{title}</h1> : null}

      <div className="products">
        {products.map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>
    </>
  );
}
