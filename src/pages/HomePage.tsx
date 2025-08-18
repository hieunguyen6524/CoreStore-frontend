import SideBarAndBanner from "../components/Layout/SideBarAndBanner";
import ProductSection from "../components/Product/ProductSection"; // đổi tên để rõ nghĩa
import { useEffect, useState } from "react";
import { getHomeProducts } from "../services/productService";
import type { Product } from "../types/product";
import Layout from "../components/Layout/Layout";

function HomePage() {
  const [homeProducts, setHomeProducts] = useState<{
    topDiscount: Product[];
    topPc: Product[];
    topLaptop: Product[];
    topKeyboard: Product[];
    topMouse: Product[];
  } | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getHomeProducts();

      setHomeProducts({
        topDiscount: res.topDiscount,
        topPc: res.topPcDiscount,
        topLaptop: res.topLaptopDiscount,
        topKeyboard: res.topKeyboardDiscount,
        topMouse: res.topMouseDiscount,
      });
    })();
  }, []);

  // if (!homeProducts) return <div>Đang tải...</div>;

  return (
    <Layout>
      <SideBarAndBanner />
      {!homeProducts ? (
        <div>Đang tải...</div>
      ) : (
        <>
          <ProductSection
            title="Top giảm giá"
            products={homeProducts.topDiscount}
          />
          <ProductSection title="Top PC" products={homeProducts.topPc} />
          <ProductSection
            title="Top Laptop"
            products={homeProducts.topLaptop}
          />
          <ProductSection
            title="Top Bàn phím"
            products={homeProducts.topKeyboard}
          />
          <ProductSection title="Top Chuột" products={homeProducts.topMouse} />
        </>
      )}
    </Layout>
  );
}

export default HomePage;
