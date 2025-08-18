import { useEffect, useState } from "react";
// import { Trash2 } from "lucide-react";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";
import Layout from "../components/Layout/Layout";
import type { Cart } from "../types/cart";
import { getCart } from "../services/cartService";

//localhost:3000/img/products/asus-vivobook-15-2025-1.png.png

function CartPage() {
  const [cart, setCart] = useState<Cart[]>([]);
  useEffect(() => {
    (async () => {
      setCart(await getCart());
    })();
  }, []);

  return (
    <Layout>
      <h1>Giỏ hàng</h1>
      <div className="cart-container">
        <div>
          {cart.map((item) => (
            <CartItems item={item} key={item.id} />
          ))}
        </div>

        <CartSummary cart={cart} />
      </div>
    </Layout>
  );
}

export default CartPage;
