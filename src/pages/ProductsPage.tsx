import { useEffect, useMemo, useState } from "react";
import ProductSection from "../components/Product/ProductSection";
import type { Product } from "../types/product";
import {
  getAllProducts,
  type ProductQueryParams,
} from "../services/productService";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SideBarAndBanner from "../components/Layout/SideBarAndBanner";
import Loading from "../ui/Loading";
import { getAllBrands } from "../services/brandService";
import type { Brand } from "../types/brand";
import { getAllCategories } from "../services/categoryService";
import type { Category } from "../types/category";

function ProductsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = location.state?.title;

  const keyword = searchParams.get("keyword") || "";
  const sortParam = searchParams.get("sort") || "-createdAt";
  const brandParam = searchParams.get("brand") || "";
  const page = Math.max(Number(searchParams.get("page") || "1"), 1);
  const limit = Math.max(Number(searchParams.get("limit") || "12"), 1);

  const [sortInput, setSortInput] = useState(sortParam);
  const [brandInput, setBrandInput] = useState(brandParam);
  const [hasMore, setHasMore] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    setSortInput(sortParam);
    setBrandInput(brandParam);
  }, [sortParam, brandParam]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      const [brandData, categoryData] = await Promise.all([
        getAllBrands(),
        getAllCategories(),
      ]);
      if (!ignore) {
        setBrands(brandData);
        setCategories(categoryData);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!slug) {
      setCategoryId("");
      return;
    }
    const matchedCategory = categories.find((category) => category.slug === slug);
    setCategoryId(matchedCategory?._id || "");
  }, [slug, categories]);

  useEffect(() => {
    if (slug && !categoryId) {
      setLoading(true);
      return;
    }
    let ignore = false;
    (async () => {
      setLoading(true);
      try {
        let res: Product[] = [];
        const query: ProductQueryParams = {
          sort: sortParam,
          page,
          limit,
        };

        if (keyword) {
          query.keyword = keyword;
        }
        const minPriceParam = searchParams.get("minPrice");
        const maxPriceParam = searchParams.get("maxPrice");
        if (minPriceParam) {
          const value = Number(minPriceParam);
          if (!Number.isNaN(value)) query.minPrice = value;
        }
        if (maxPriceParam) {
          const value = Number(maxPriceParam);
          if (!Number.isNaN(value)) query.maxPrice = value;
        }
        if (brandParam) {
          query.brand = brandParam;
        }
        if (categoryId) {
          query.category = categoryId;
        }

        res = await getAllProducts(query);

        if (!ignore) {
          setProducts(res);
          setHasMore(res.length === limit);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        if (!ignore) {
          setProducts([]);
          setHasMore(false);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, [
    slug,
    categoryId,
    keyword,
    sortParam,
    page,
    limit,
    brandParam,
  ]);

  const sectionTitle = useMemo(() => {
    if (slug) {
      const matched = categories.find((category) => category.slug === slug);
      if (matched) return matched.name;
      if (title) return title;
      return "Danh mục sản phẩm";
    }
    if (keyword) return `Kết quả cho "${keyword}"`;
    return "Tất cả sản phẩm";
  }, [slug, title, keyword, categories]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (sortInput) {
      params.set("sort", sortInput);
    } else {
      params.delete("sort");
    }

    params.delete("minPrice");
    params.delete("maxPrice");

    if (brandInput) {
      params.set("brand", brandInput);
    } else {
      params.delete("brand");
    }

    params.set("page", "1");
    params.set("limit", limit.toString());
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sort");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("brand");
    params.set("page", "1");
    params.set("limit", limit.toString());
    setSearchParams(params);
  };

  const handleViewAllProducts = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("limit", limit.toString());
    setSearchParams(params);
    navigate("/products");
  };

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && page === 1) return;
    if (direction === "next" && !hasMore) return;

    const nextPage = direction === "prev" ? page - 1 : page + 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", nextPage.toString());
    params.set("limit", limit.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Layout>
        <SideBarAndBanner />
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <SideBarAndBanner />
      <div className="product-filters">
        <form onSubmit={handleFilterSubmit}>
          <div className="filter-group">
            <label>Sắp xếp</label>
            <select value={sortInput} onChange={(e) => setSortInput(e.target.value)}>
              <option value="-createdAt">Mới nhất</option>
              <option value="price">Giá tăng dần</option>
              <option value="-price">Giá giảm dần</option>
              <option value="-discount">Giảm giá nhiều nhất</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Thương hiệu</label>
            <select value={brandInput} onChange={(e) => setBrandInput(e.target.value)}>
              <option value="">Tất cả</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button type="submit" className="btn btn--primary">
              Áp dụng
            </button>
            <button type="button" className="btn btn--secondary" onClick={handleResetFilters}>
              Xóa lọc
            </button>
            <button type="button" className="btn btn--secondary" onClick={handleViewAllProducts}>
              Tất cả sản phẩm
            </button>
          </div>
        </form>
      </div>

      <ProductSection title={sectionTitle} products={products} />

      <div className="product-pagination">
        <button className="btn" onClick={() => handlePageChange("prev")} disabled={page === 1}>
          Trang trước
        </button>
        <span>Trang {page}</span>
        <button className="btn" onClick={() => handlePageChange("next")} disabled={!hasMore}>
          Trang sau
        </button>
      </div>
    </Layout>
  );
}

export default ProductsPage;
