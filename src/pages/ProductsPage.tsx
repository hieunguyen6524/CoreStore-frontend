import { useEffect, useState } from "react";
import ProductSection from "../components/Product/ProductSection";
import type { Product } from "../types/product";
import {
  getProductByCategory,
  searchProduct,
} from "../services/productService";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SideBarAndBanner from "../components/Layout/SideBarAndBanner";

function ProductsPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const title = location.state?.title;
  const navigate = useNavigate();

  const search = searchParams.get("keyword");

  useEffect(() => {
    (async () => {
      let res: Product[] = [];
      if (search) {
        res = await searchProduct(search);
      } else {
        if (slug) {
          res = await getProductByCategory(slug as string);
        } else {
          navigate("/");
        }
      }
      setProducts(res || []);
    })();
  }, [slug, search, navigate]);

  return (
    <Layout>
      <SideBarAndBanner />
      <ProductSection title={title} products={products} />
    </Layout>
  );
}

export default ProductsPage;
