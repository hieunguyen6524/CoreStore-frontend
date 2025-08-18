import type { Cart } from "../../types/cart";

interface CartSummaryProps {
  cart: Cart[];
}

function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div className="summary-row discount">
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
      </div>

      <button className="checkout-btn">Go to Checkout →</button>
    </div>
  );
}

export default CartSummary;
