import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { getOrdersByUser } from "../services/orderService";
import type { Order } from "../types/order";
import OrderCard from "../components/Order/OrderCard";
import Loading from "../ui/Loading";

function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const status = filter === "all" ? undefined : filter;
      const ordersData = await getOrdersByUser(status);
      setOrders(ordersData);
      setLoading(false);
    })();
  }, [filter]);

  if (loading) return <Loading />;

  return (
    <Layout>
      <main className="main">
        <div className="orders-container">
          <h1 className="heading-primary">Đơn hàng của tôi</h1>

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
          </div>

          {orders.length === 0 ? (
            <div className="empty-orders">
              <h2>Chưa có đơn hàng nào</h2>
              <p>Bạn chưa có đơn hàng nào trong danh mục này</p>
              <button
                className="btn btn--primary"
                onClick={() => (window.location.href = "/home")}
              >
                Mua sắm ngay
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default MyOrdersPage;

