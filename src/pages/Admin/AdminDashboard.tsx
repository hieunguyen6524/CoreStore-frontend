import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import axiosClient from "../../utils/axiosClient";
import Loading from "../../ui/Loading";
import { adminGetAllOrders, adminGetDailyInsights } from "../../services/adminService";

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  paidOrders: number;
}

interface DailyRevenue {
  _id: { day: string };
  revenue: number;
  orders: number;
}

interface SalesPerformanceEntry {
  _id: string;
  revenue: number;
  sold: number;
}

interface SalesInsights {
  range: { from: string; to: string };
  dailyRevenue: DailyRevenue[];
  topCategories: SalesPerformanceEntry[];
  topBrands: SalesPerformanceEntry[];
}

function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [insights, setInsights] = useState<SalesInsights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [productsRes, usersRes, orders, insightsData] = await Promise.all([
          axiosClient.get("/api/products?limit=1000", { withCredentials: true }),
          axiosClient.get("/api/users?limit=1000", { withCredentials: true }),
          adminGetAllOrders({ limit: 1000 }),
          adminGetDailyInsights({ days: 30 }),
        ]);

        const totalProducts =
          productsRes.data.results || productsRes.data.data?.data?.length || 0;
        const totalUsers =
          usersRes.data.results || usersRes.data.data?.data?.length || 0;
        const orderList = orders || [];

        const totalOrders = orderList.length;
        const pendingOrders = orderList.filter((o: any) => o.status === "pending").length;
        const paidOrders = orderList.filter((o: any) => o.status === "paid").length;
        const totalRevenue = orderList
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
        if (insightsData) {
          setInsights(insightsData);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const recentDailyRevenue = useMemo(() => {
    if (!insights?.dailyRevenue) return [];
    return insights.dailyRevenue.slice(-7);
  }, [insights]);

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

        {insights && (
          <div className="insights-grid">
            <div className="insights-card">
              <div className="insights-card__header">
                <h3>Doanh thu 7 ngày gần nhất</h3>
                <span>
                  {new Date(insights.range.from).toLocaleDateString("vi-VN")} -{" "}
                  {new Date(insights.range.to).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <ul className="insights-list">
                {recentDailyRevenue.length === 0 && <li>Chưa có doanh thu</li>}
                {recentDailyRevenue.map((entry) => (
                  <li key={entry._id.day} className="insights-list__item">
                    <span>{entry._id.day}</span>
                    <span>
                      {entry.revenue.toLocaleString("vi-VN")}đ · {entry.orders} đơn
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="insights-card">
              <div className="insights-card__header">
                <h3>Top danh mục</h3>
              </div>
              <ul className="insights-list">
                {insights.topCategories.length === 0 && <li>Chưa có dữ liệu</li>}
                {insights.topCategories.map((category) => (
                  <li key={category._id} className="insights-list__item">
                    <span>{category._id}</span>
                    <span>
                      {category.revenue.toLocaleString("vi-VN")}đ · {category.sold} sản phẩm
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="insights-card">
              <div className="insights-card__header">
                <h3>Top thương hiệu</h3>
              </div>
              <ul className="insights-list">
                {insights.topBrands.length === 0 && <li>Chưa có dữ liệu</li>}
                {insights.topBrands.map((brand) => (
                  <li key={brand._id} className="insights-list__item">
                    <span>{brand._id}</span>
                    <span>
                      {brand.revenue.toLocaleString("vi-VN")}đ · {brand.sold} sản phẩm
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

