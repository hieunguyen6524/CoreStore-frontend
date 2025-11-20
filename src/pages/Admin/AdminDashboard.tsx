import { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import axiosClient from "../../utils/axiosClient";
import Loading from "../../ui/Loading";

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  paidOrders: number;
}

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Lấy thống kê từ các API
        const [productsRes, usersRes, ordersRes] = await Promise.all([
          axiosClient.get("/api/products?limit=1000", { withCredentials: true }),
          axiosClient.get("/api/users?limit=1000", { withCredentials: true }),
          axiosClient.get("/api/order/my-orders", { withCredentials: true }),
        ]);

        const totalProducts = productsRes.data.results || productsRes.data.data?.data?.length || 0;
        const totalUsers = usersRes.data.results || usersRes.data.data?.data?.length || 0;
        const orders = ordersRes.data.data?.orders || [];
        
        const totalOrders = orders.length;
        const pendingOrders = orders.filter((o: any) => o.status === "pending").length;
        const paidOrders = orders.filter((o: any) => o.status === "paid").length;
        const totalRevenue = orders
          .filter((o: any) => o.status === "paid")
          .reduce((sum: number, o: any) => sum + (o.total || 0), 0);

        setStats({
          totalProducts,
          totalUsers,
          totalOrders,
          totalRevenue,
          pendingOrders,
          paidOrders,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card stat-card--primary">
            <div className="stat-card__icon">📦</div>
            <div className="stat-card__content">
              <h3 className="stat-card__label">Tổng sản phẩm</h3>
              <p className="stat-card__value">{stats?.totalProducts || 0}</p>
            </div>
          </div>

          <div className="stat-card stat-card--success">
            <div className="stat-card__icon">👥</div>
            <div className="stat-card__content">
              <h3 className="stat-card__label">Tổng người dùng</h3>
              <p className="stat-card__value">{stats?.totalUsers || 0}</p>
            </div>
          </div>

          <div className="stat-card stat-card--warning">
            <div className="stat-card__icon">🛒</div>
            <div className="stat-card__content">
              <h3 className="stat-card__label">Tổng đơn hàng</h3>
              <p className="stat-card__value">{stats?.totalOrders || 0}</p>
            </div>
          </div>

          <div className="stat-card stat-card--info">
            <div className="stat-card__icon">💰</div>
            <div className="stat-card__content">
              <h3 className="stat-card__label">Tổng doanh thu</h3>
              <p className="stat-card__value">
                {(stats?.totalRevenue || 0).toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card__content">
              <h3 className="stat-card__label">Đơn chờ thanh toán</h3>
              <p className="stat-card__value">{stats?.pendingOrders || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card__content">
              <h3 className="stat-card__label">Đơn đã thanh toán</h3>
              <p className="stat-card__value">{stats?.paidOrders || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

