import { memo } from "react";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  title: string;
  products: Product[];
}

function ProductSection({ title, products }: ProductSectionProps) {
  const hasProducts = products.length > 0;

  return (
    <>
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          marginBottom: "24px",
          marginTop: "40px",
        }}
      >
        {title ? (
          <h2 className="title" style={{ margin: 0, padding: 0, fontSize: "2.4rem" }}>
            {title}
          </h2>
        ) : null}
      </div>

      {hasProducts ? (
      <div className="products">
        {products.map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>
      ) : (
        <div className="products-empty">
          Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.
        </div>
      )}
    </>
  );
}

export default memo(ProductSection);
