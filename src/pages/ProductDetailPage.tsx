import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProductDetail from "../components/Product/ProductDetail";
import { getDetailProduct } from "../services/productService";
import type { Product } from "../types/product";
import Loading from "../ui/Loading";

function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await getDetailProduct(slug);
      setProduct(res);
    } catch (error) {
      console.error("Erro get product by slug:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : product ? (
        <ProductDetail product={product} onReviewSubmitted={fetchProduct} />
      ) : (
        <p style={{ padding: "4rem 0", textAlign: "center" }}>
          Không tìm thấy sản phẩm.
        </p>
      )}
    </Layout>
  );
}

export default ProductDetailPage;
