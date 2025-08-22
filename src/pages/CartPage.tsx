import { useEffect, useState } from "react";
// import { Trash2 } from "lucide-react";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";
import Layout from "../components/Layout/Layout";
import type { Cart } from "../types/cart";
import { deleteCartItem, getCart } from "../services/cartService";
import ModalQR from "../components/Cart/ModalQR";

//localhost:3000/img/products/asus-vivobook-15-2025-1.png.png

function CartPage() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [qr, setQR] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    (async () => {
      setCart(await getCart());
    })();
  }, []);

  async function handleDeleteItem(id: string) {
    await deleteCartItem(id);
    setCart(cart.filter((item) => item._id !== id));
  }

  async function handleUpdateQuantity(id: string, newQuantity: number) {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  return (
    <Layout>
      <h1>Giỏ hàng</h1>
      <div className="cart-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img
              src="Empty-Cart.png" // để icon xe hàng trống ở public/images
              alt="Empty Cart"
              className="empty-cart-img"
            />
            <h2>
              Giỏ hàng <span className="text-red-500">Rỗng!</span>
            </h2>
            <p>Phải thêm ít nhất 1 sản phẩm để có thể thanh toán</p>
            <button
              className="return-btn"
              onClick={() => (window.location.href = "/home")}
            >
              VỀ TRANG CHỦ
            </button>
          </div>
        ) : (
          <>
            <div>
              {cart.map((item) => (
                <CartItems
                  item={item}
                  key={item._id}
                  handleDeleteItem={handleDeleteItem}
                  handleUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
          </>
        )}
        <CartSummary
          cart={cart}
          setIsModal={setIsModal}
          setQR={setQR}
          setOrderId={setOrderId}
        />
      </div>

      {isModal && <ModalQR qr={qr} setIsModal={setIsModal} orderId={orderId} />}
    </Layout>
  );
}

export default CartPage;
