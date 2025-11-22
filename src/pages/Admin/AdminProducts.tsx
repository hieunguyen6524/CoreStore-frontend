import { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import {
  adminGetAllProducts,
  adminDeleteProduct,
} from "../../services/adminService";
import type { Product } from "../../types/product";
import Loading from "../../ui/Loading";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../../utils/imageUrl";

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data = await adminGetAllProducts({
      page,
      limit: 20,
      keyword: searchKeyword || undefined,
    });
    setProducts(data);
    setLoading(false);
  }, [page, searchKeyword]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      setSearchKeyword(keyword);
      setPage(1); // Reset về trang 1 khi tìm kiếm
    },
    [keyword]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setSearchKeyword(keyword);
        setPage(1);
      }
    },
    [keyword]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        const success = await adminDeleteProduct(id);
        if (success) {
          loadProducts();
        }
      }
    },
    [loadProducts]
  );

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div className="admin-products">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Quản lý Sản phẩm</h1>
          <Link to="/admin/products/new" className="btn btn--primary">
            <Plus size={20} />
            Thêm sản phẩm
          </Link>
        </div>

        <form className="admin-search" onSubmit={handleSearch}>
          <div className="search-box">
            <button
              type="submit"
              className="search-icon-btn"
              style={{ border: "0px" }}
            >
              <Search size={20} />
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </form>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Giảm giá</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    Không có sản phẩm nào
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={getProductImageUrl(product.thumbnail)}
                        alt={product.name}
                        className="product-thumb"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price.toLocaleString("vi-VN")}đ</td>
                    <td>{product.discount}%</td>
                    <td>{product.stock}</td>
                    <td>
                      <span
                        className={`status-badge status-badge--${product.status}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="btn-icon btn-icon--edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="btn-icon btn-icon--delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-pagination">
          <button
            className="btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Trước
          </button>
          <span>Trang {page}</span>
          <button
            className="btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={products.length < 20}
          >
            Sau
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminProducts;
