import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import { getDetailProduct } from "../services/productService";
import type { Product } from "../types/product";
import ProductDetail from "../components/Product/ProductDetail";

function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const res = await getDetailProduct(slug as string);

        setProduct(res);
      } catch (error) {
        console.error("Erro get product by slug:", error);
        return null;
      }
    })();
  }, [slug]);

  return (
    <Layout>
      {product ? <ProductDetail product={product} /> : "khong co san pham"}
    </Layout>
  );
}

export default ProductDetailPage;
