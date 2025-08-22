import { Trash2 } from "lucide-react";
import type { Cart } from "../../types/cart";
import { useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { updateQuantityItem } from "../../services/cartService";
import toast from "react-hot-toast";

interface CartItemsProps {
  item: Cart;
  handleDeleteItem: (id: string) => Promise<void>;
  handleUpdateQuantity: (id: string, newQuantity: number) => void;
}

function CartItems({
  item,
  handleDeleteItem,
  handleUpdateQuantity,
}: CartItemsProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  console.log(item);
  const debounceUpdate = useMemo(
    () =>
      debounce(async (newQuantity: number) => {
        await updateQuantityItem(item._id, newQuantity);
        // console.log("Updated quantity:", newQuantity);
      }, 500),
    [item._id]
  );

  function handleIncrease() {
    setQuantity((prev) => {
      if (prev < item.product.stock) {
        const newQuantity = prev + 1;
        debounceUpdate(newQuantity);
        handleUpdateQuantity(item._id, newQuantity);
        return newQuantity;
      } else {
        toast(`Kho hiện chỉ còn ${item.product.stock} sản phẩm.`, {
          icon: "😔",
        });
      }
      return prev;
    });
  }

  function handleDecrease() {
    setQuantity((prev) => {
      const newQuantity = Math.max(1, prev - 1);
      debounceUpdate(newQuantity);
      handleUpdateQuantity(item._id, newQuantity);

      return newQuantity;
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      if (value >= item.product.stock) {
        setQuantity(item.product.stock);
        toast(`Kho hiện chỉ còn ${item.product.stock} sản phẩm.`, {
          icon: "😔",
        });
      } else setQuantity(value);
    }
  }

  // Khi input mất focus → gọi API luôn
  async function handleBlur() {
    await updateQuantityItem(item._id, quantity);
    handleUpdateQuantity(item._id, quantity);
  }

  return (
    <div className="cart-items">
      <div className="cart-item" key={item._id}>
        <div className="item-info">
          <img src={item.product.thumbnail} alt={item.product.name} />
          <div>
            <h3>{item.product.name}</h3>

            <span className="price price-old">
              {item.product.price.toLocaleString("vi-VN")}₫
            </span>
            <span className="price">
              {item.product.priceAfterDiscount.toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        <div className="item-actions">
          <div className="quantity">
            <button onClick={handleDecrease}>−</button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-16 text-center border rounded"
            />
            <button onClick={handleIncrease}>+</button>
          </div>
          <button
            className="delete-btn"
            onClick={() => handleDeleteItem(item._id)}
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
