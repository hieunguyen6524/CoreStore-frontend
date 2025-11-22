import { memo } from "react";
import type { Product } from "../../types/product";
import Loading from "../../ui/Loading";

import ProductCard from "./ProductCard";

interface ProductSectionProps {
  title: string;
  products: Product[];
}

function ProductSection({
  title,
  products,
}: ProductSectionProps) {
  if (products.length == 0) return <Loading />;

  return (
    <>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', marginBottom: '24px', marginTop: '40px' }}>
        {title ? <h2 className="title" style={{ margin: 0, padding: 0, fontSize: '2.4rem' }}>{title}</h2> : null}
      </div>

      <div className="products">
        {products.map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>
    </>
  );
}

export default memo(ProductSection);
