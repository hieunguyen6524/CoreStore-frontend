/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Order } from "../../types/order";
import { X } from "lucide-react";
import { getProductImageUrl } from "../../utils/imageUrl";

interface AdminOrderCardProps {
  order: Order;
  onCancel?: (orderId: string) => void;
  showCancelButton?: boolean;
}

function AdminOrderCard({
  order,
  onCancel,
  showCancelButton = true,
}: AdminOrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      case "cancelled":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "failed":
        return "Thất bại";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const handleCancel = () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      if (onCancel && order._id) {
        onCancel(order._id);
      }
    }
  };

  return (
    <div className="order-card">
      <div className="order-card__header">
        <div className="order-card__info">
          <h3 className="order-card__title">Đơn hàng #{order.paymentId}</h3>
          <p className="order-card__date">
            {new Date(order.createdAt).toLocaleString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {(order as any).userInfo && (
            <p className="order-card__user">
              Khách hàng: {(order as any).userInfo.name} (
              {(order as any).userInfo.email})
            </p>
          )}
        </div>
        <div className="order-card__status">
          <span className={getStatusColor(order.status)}>
            {getStatusText(order.status)}
          </span>
        </div>
      </div>

      <div className="order-card__items">
        {order.items.map((item) => (
          <div key={item._id} className="order-item">
            <div className="order-item__image">
              <img
                src={getProductImageUrl(item.product.thumbnail)}
                alt={item.product.name}
              />
            </div>
            <div className="order-item__info">
              <h4 className="order-item__name">{item.product.name}</h4>
              <p className="order-item__details">
                Số lượng: {item.quantity} x {item.price.toLocaleString("vi-VN")}
                đ
              </p>
            </div>
            <div className="order-item__price">
              {(item.quantity * item.price).toLocaleString("vi-VN")}đ
            </div>
          </div>
        ))}
      </div>

      <div className="order-card__footer">
        <div className="order-card__total">
          <span className="order-card__total-label">Tổng tiền:</span>
          <span className="order-card__total-amount">
            {order.total.toLocaleString("vi-VN")}đ
          </span>
        </div>
        {showCancelButton && order.status === "pending" && (
          <button className="btn btn--danger btn--small" onClick={handleCancel}>
            <X size={16} />
            Hủy đơn hàng
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminOrderCard;
