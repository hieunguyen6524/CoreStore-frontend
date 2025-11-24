import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { addCart } from "../../services/cartService";
import { submitReview } from "../../services/reviewService";
import type { RootState } from "../../store/store";
import type { Product } from "../../types/product";
import { getProductImageUrl } from "../../utils/imageUrl";

interface ProductDetailProps {
  product: Product;
  onReviewSubmitted?: () => Promise<void> | void;
}

function ProductDetail({ product, onReviewSubmitted }: ProductDetailProps) {
  const [mainImage, setMainImage] = useState(getProductImageUrl(product.thumbnail));
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const productId = product._id || product.id;
  const ratingAverage = useMemo(() => {
    const avg = (product as any).ratingsAverage ?? product.ratingsAvergage;
    return typeof avg === "number" ? avg : 0;
  }, [product]);
  const ratingQuantity = product.ratingsQuantity ?? 0;

  const handleAddCart = useCallback(async () => {
    if (!productId) {
      toast.error("Không tìm thấy sản phẩm");
      return;
    }
    await addCart(productId, 1);
  }, [productId]);

  const changeMainImg = useCallback((url: string) => {
    setMainImage(url);
  }, []);

  const handleSubmitReview = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!productId) {
        toast.error("Không tìm thấy sản phẩm");
        return;
      }
      if (!isLogin) {
        toast.error("Vui lòng đăng nhập để đánh giá");
        return;
      }

      setIsSubmittingReview(true);
      try {
        await submitReview(productId, {
          rating: reviewRating,
          comment: reviewComment,
        });
        toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
        setReviewComment("");
        if (onReviewSubmitted) {
          await onReviewSubmitted();
        }
      } catch {
        // Toast đã được bắn trong service
      } finally {
        setIsSubmittingReview(false);
      }
    },
    [isLogin, onReviewSubmitted, productId, reviewComment, reviewRating]
  );

  return (
    <div className="product-detail">
      <div className="product-detail__top">
        <div className="product-detail__images">
          <div className="product-detail__images-main">
            <img src={mainImage} alt={product.name} />
          </div>
          <div className="product-detail__images-thumbnails">
            {product.images.map((img) => (
              <img
                key={img}
                src={getProductImageUrl(img)}
                alt="thumb"
                onClick={() => changeMainImg(getProductImageUrl(img))}
              />
            ))}
          </div>
        </div>

        <div className="product-detail__info">
          <h1 className="product-detail__info-title">{product.name}</h1>

          <div className="product-detail__info-rating">
            <span className="rating-number">{ratingAverage.toFixed(1)} / 5 ⭐</span>
            <span className="rating-count">({ratingQuantity} đánh giá)</span>
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

      <div className="product-detail__reviews">
        <h2>Đánh giá sản phẩm</h2>
        <div className="product-detail__rating-summary">
          <div className="rating-score">
            {ratingAverage.toFixed(1)}
            <small>/5</small>
          </div>
          <div className="rating-meta">
            <strong>{ratingQuantity}</strong> lượt đánh giá
          </div>
        </div>

        {isLogin ? (
          <form className="product-detail__review-form" onSubmit={handleSubmitReview}>
            <label>
              Chọn số sao
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} sao
                  </option>
                ))}
              </select>
            </label>

            <label>
              Nhận xét của bạn
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              />
            </label>

            <button type="submit" className="btn btn--primary" disabled={isSubmittingReview}>
              {isSubmittingReview ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </form>
        ) : (
          <p className="product-detail__review-note">
            Vui lòng đăng nhập và mua sản phẩm để có thể đánh giá.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
