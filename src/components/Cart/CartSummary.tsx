import { checkout } from "../../services/orderService";
import type { Cart } from "../../types/cart";

interface CartSummaryProps {
  cart: Cart[];
  setIsModal: (value: boolean) => void; // sửa type
  setQR: (url: string) => void;
  setOrderId: (url: string) => void;
}

function CartSummary({
  cart,
  setIsModal,
  setQR,
  setOrderId,
}: CartSummaryProps) {
  const total = cart.reduce(
    (sum, item) => sum + item.product.priceAfterDiscount * item.quantity,
    0
  );
  // const discount = subtotal * 0.2;
  // const deliveryFee = 15;
  // const total = subtotal - discount + deliveryFee;

  async function handleCheckout() {
    const res = await checkout();
    setQR(res.data.qrUrl);
    setOrderId(res.data.order._id);
    setIsModal(true);
  }
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

export default CartSummary;
