import { addCart } from "../../services/cartService";
import type { Product } from "../../types/product";

interface ProductDetailProps {
  product: Product;
}

function ProductDetail({ product }: ProductDetailProps) {
  async function handleAddCart() {
    await addCart(product.id, 1);
  }

  return (
    <div className="product-detail">
      <div className="product-detail__top">
        <div className="product-detail__images">
          <div className="product-detail__images-main">
            <img src={product.thumbnail} alt={product.name} />
          </div>
          <div className="product-detail__images-thumbnails">
            {product.images.map((img) => (
              <img key={img} src={img} alt="thumb" />
            ))}
          </div>
        </div>

        <div className="product-detail__info">
          <h1 className="product-detail__info-title">{product.name}</h1>

          <div className="product-detail__info-rating">
            <a href="#">Xem đánh giá</a>
          </div>

          <div className="product-detail__info-price">
            <span className="product-detail__info-price-current">
              {product.priceAfterDiscount.toLocaleString("vi-VN")}₫
            </span>
            <span className="product-detail__info-price-old">
              {product.price.toLocaleString("vi-VN")}₫
            </span>
            <span className="product-detail__info-price-discount">
              -{product.discount}%
            </span>
          </div>

          <div className="product-detail__info-promotion">
            <h4>🎁 Quà tặng khuyến mãi</h4>
            <ul>
              <li>Tặng 1 x Lót chuột...</li>
              <li>Tặng 1 x Đế Tản Nhiệt...</li>
            </ul>
          </div>

          <div className="product-detail__info-actions">
            <button className="product-detail__info-actions-buy-now">
              MUA NGAY
            </button>
            <button
              className="product-detail__info-actions-add-cart"
              onClick={handleAddCart}
            >
              Thêm vào giỏ
            </button>
          </div>

          <div className="product-detail__info-attributes">
            <h1>Thông tin sản phẩm</h1>
            <div className="product-detail__info-attributes-list">
              {product.attributes.map((attr) => (
                <div
                  className="product-detail__info-attributes-item"
                  key={attr.key}
                >
                  <div className="product-detail__info-attributes-item-key">
                    {attr.key}
                  </div>
                  <div className="product-detail__info-attributes-item-value">
                    {attr.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
