import { Trash2 } from "lucide-react";
import type { Cart } from "../../types/cart";

interface CartItemsProps {
  item: Cart;
}

function CartItems({ item }: CartItemsProps) {
  return (
    <div className="cart-items">
      <div className="cart-item" key={item.id}>
        <div className="item-info">
          <img src={item.product.thumbnail} alt={item.product.name} />
          <div>
            <h3>{item.product.name}</h3>
            {/* <p>Size: {item.size}</p>
            <p>Color: {item.color}</p> */}
            <span className="price">
              {item.product.priceAfterDiscount.toLocaleString("vi-VN")}
            </span>
          </div>
        </div>

        <div className="item-actions">
          <div className="quantity">
            <button>−</button>
            <span>{item.quantity}</span>
            <button>+</button>
          </div>
          <button className="delete-btn">
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
