import { useEffect, useState } from "react";
import ProductSection from "../components/Product/ProductSection";
import type { Product } from "../types/product";
import { getProductByCategory } from "../services/productService";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SideBarAndBanner from "../components/Layout/SideBarAndBanner";

function ProductsPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const title = location.state?.title;

  useEffect(() => {
    (async () => {
      const res = await getProductByCategory(slug as string);
      setProducts(res);
    })();
  }, [slug]);

  return (
    <Layout>
      <SideBarAndBanner />
      <ProductSection title={title} products={products} />
    </Layout>
  );
}

export default ProductsPage;
