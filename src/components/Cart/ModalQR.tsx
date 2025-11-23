import { useEffect, useState } from "react";
import socket from "../../socket";

interface ModalQRProps {
  orderId: string;
  qr: string;
  setIsModal: (value: boolean) => void;
}

export default function ModalQR({ qr, setIsModal, orderId }: ModalQRProps) {
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

  console.log(qr);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={() => setIsModal(false)}>
          ✖
        </button>
        <h2>Quét mã để thanh toán</h2>
        <img src={qr} alt="QR Code" />
        {status === "paid" ? (
          <p className="success">Thanh toán thành công 🎉</p>
        ) : (
          <p className="pending">Đang chờ thanh toán...</p>
        )}
      </div>
    </div>
  );
}
