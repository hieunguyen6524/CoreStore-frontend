import { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { adminGetAllOrders, adminCancelOrder } from "../../services/adminService";
import type { Order } from "../../types/order";
import Loading from "../../ui/Loading";
import AdminOrderCard from "../../components/Order/AdminOrderCard";

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadOrders();
  }, [filter]);

  const loadOrders = async () => {
    setLoading(true);
    const status = filter === "all" ? undefined : filter;
    const data = await adminGetAllOrders({ status });
    setOrders(data);
    setLoading(false);
  };

  const handleCancel = async (orderId: string) => {
    const success = await adminCancelOrder(orderId);
    if (success) {
      loadOrders();
    }
  };

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div className="admin-orders">
        <h1 className="admin-page-title">Quản lý Đơn hàng</h1>

        <div className="orders-filter">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Tất cả
          </button>
          <button
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Chờ thanh toán
          </button>
          <button
            className={`filter-btn ${filter === "paid" ? "active" : ""}`}
            onClick={() => setFilter("paid")}
          >
            Đã thanh toán
          </button>
          <button
            className={`filter-btn ${filter === "failed" ? "active" : ""}`}
            onClick={() => setFilter("failed")}
          >
            Thất bại
          </button>
          <button
            className={`filter-btn ${filter === "cancelled" ? "active" : ""}`}
            onClick={() => setFilter("cancelled")}
          >
            Đã hủy
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>Chưa có đơn hàng nào</h2>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <AdminOrderCard
                key={order._id}
                order={order}
                onCancel={handleCancel}
                showCancelButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;

