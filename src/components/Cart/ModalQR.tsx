import { useEffect, useState } from "react";
import socket from "../../socket";

interface ModalQRProps {
  orderId: string;
  qr: string;
  orderData: {
    paymentId: string;
    total: number;
    bankAccount?: string;
    bankCode?: string;
  };
  setIsModal: (value: boolean) => void;
}

export default function ModalQR({ qr, setIsModal, orderId, orderData }: ModalQRProps) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    socket.emit("joinOrder", orderId);
    socket.on("orderPaid", (data) => {
      if (data.orderId === orderId) setStatus("paid");
    });
    return () => {
      socket.off("orderPaid");
    };
  }, [orderId]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={() => setIsModal(false)}>
          ✖
        </button>
        <h2>Quét mã để thanh toán</h2>
        
        <div className="qr-section">
          <img src={qr} alt="QR Code" className="qr-image" />
        </div>

        <div className="payment-info">
          <div className="info-row">
            <span className="label">Mã đơn hàng:</span>
            <span className="value">{orderData.paymentId}</span>
          </div>
          <div className="info-row">
            <span className="label">Số tiền:</span>
            <span className="value amount">{orderData.total.toLocaleString("vi-VN")}₫</span>
          </div>
          {orderData.bankAccount && (
            <div className="info-row">
              <span className="label">Số tài khoản:</span>
              <span className="value">{orderData.bankAccount}</span>
            </div>
          )}
          {orderData.bankCode && (
            <div className="info-row">
              <span className="label">Ngân hàng:</span>
              <span className="value">{orderData.bankCode}</span>
            </div>
          )}
        </div>

        {status === "paid" ? (
          <p className="success">Thanh toán thành công 🎉</p>
        ) : (
          <p className="pending">Đang chờ thanh toán...</p>
        )}
      </div>
    </div>
  );
}
