import { memo, useCallback } from "react";
import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { getProductImageUrl } from "../../utils/imageUrl";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(`/product/${product.slug}`);
  }, [navigate, product.slug]);

  return (
    <div className="product-card" key={product.slug} onClick={handleClick}>
      <img src={getProductImageUrl(product.thumbnail)} alt={product.name} className="product-img" />
      <h3 className="product-name">{product.name}</h3>
      {/* <div className="product-rating">
              ⭐⭐⭐☆☆
              <span>3.5/5</span>
            </div> */}
      <div className="product-price">
        {product.discount ? (
          <>
            <span className="price-original">
              {product.price.toLocaleString()}₫
            </span>
            <div className="price-final-wrap">
              <span className="price-final">
                {product.priceAfterDiscount.toLocaleString("vi-VN")}₫
              </span>
              <span className="price-discount">-{product.discount}%</span>
            </div>
          </>
        ) : (
          <span className="price-final">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
        )}
      </div>
    </div>
  );
}

export default memo(ProductCard);
