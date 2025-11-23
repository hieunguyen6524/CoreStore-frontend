import { memo, useMemo, useCallback } from "react";
import { checkout } from "../../services/orderService";
import type { Cart } from "../../types/cart";

interface CartSummaryProps {
  cart: Cart[];
  setIsModal: (value: boolean) => void;
  setQR: (url: string) => void;
  setOrderId: (url: string) => void;
  setOrderData: (data: any) => void;
}

function CartSummary({
  cart,
  setIsModal,
  setQR,
  setOrderId,
  setOrderData,
}: CartSummaryProps) {
  const total = useMemo(() => 
    cart.reduce(
      (sum, item) => sum + item.product.priceAfterDiscount * item.quantity,
      0
    ),
    [cart]
  );
  // const discount = subtotal * 0.2;
  // const deliveryFee = 15;
  // const total = subtotal - discount + deliveryFee;

  const handleCheckout = useCallback(async () => {
    const res = await checkout();
    setQR(res.data.qrUrl);
    setOrderId(res.data.order._id);
    setOrderData({
      paymentId: res.data.order.paymentId,
      total: res.data.order.total,
      bankAccount: res.data.bankAccount,
      bankCode: res.data.bankCode,
    });
    setIsModal(true);
  }, [setQR, setOrderId, setOrderData, setIsModal]);
  return (
    <div className="order-summary">
      <h3>Ước tính</h3>
      <div className="summary-row">
        <span>Tổng tiền:</span>
        <span>{total.toLocaleString("vi-VN")}₫</span>
      </div>
      {/* <div className="summary-row discount">
        <span>Discount (-20%)</span>
        <span>- ${discount}</span>
      </div>
      <div className="summary-row">
        <span>Delivery Fee</span>
        <span>${deliveryFee}</span>
      </div>
      <hr />
      <div className="summary-row total">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <div className="promo-code">
        <input type="text" placeholder="Add promo code" />
        <button>Apply</button>
      </div> */}

      <button
        className={`checkout-btn ${
          cart.length == 0 ? "checkout-btn--disable" : ""
        }`}
        onClick={handleCheckout}
        disabled={cart.length == 0}
      >
        Go to Checkout →
      </button>
    </div>
  );
}

export default memo(CartSummary);
