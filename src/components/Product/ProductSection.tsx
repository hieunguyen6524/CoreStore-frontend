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
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', marginBottom: '24px', marginTop: '40px' }}>
        {title ? <h2 className="title" style={{ margin: 0, padding: 0, fontSize: '2.4rem' }}>{title}</h2> : null}
        <a href="#" style={{ color: '#3b82f6', fontWeight: 600, fontSize: '1.4rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Xem tất cả
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>

      <div className="products">
        {products.map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>
    </>
  );
}
