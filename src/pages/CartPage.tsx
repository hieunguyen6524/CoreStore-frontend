import { useEffect, useState, useCallback, useMemo } from "react";
// import { Trash2 } from "lucide-react";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";
import Layout from "../components/Layout/Layout";
import type { Cart } from "../types/cart";
import { deleteCartItem, getCart } from "../services/cartService";
import ModalQR from "../components/Cart/ModalQR";
import { useNavigate } from "react-router-dom";

//localhost:3000/img/products/asus-vivobook-15-2025-1.png.png

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [qr, setQR] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    (async () => {
      setCart(await getCart());
    })();
  }, []);

  const handleDeleteItem = useCallback(async (id: string) => {
    await deleteCartItem(id);
    setCart((prev) => prev.filter((item) => item._id !== id));
  }, []);

  const handleUpdateQuantity = useCallback((id: string, newQuantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const handleNavigateHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const cartItems = useMemo(() => 
    cart.map((item) => (
      <CartItems
        item={item}
        key={item._id}
        handleDeleteItem={handleDeleteItem}
        handleUpdateQuantity={handleUpdateQuantity}
      />
    )),
    [cart, handleDeleteItem, handleUpdateQuantity]
  );

  const cartContent = useMemo(() => (
    <>
      <h1>Giỏ hàng</h1>
      <div className="cart-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img
              src="Empty-Cart.png"
              alt="Empty Cart"
              className="empty-cart-img"
            />
            <h2>
              Giỏ hàng <span className="text-red-500">Rỗng!</span>
            </h2>
            <p>Phải thêm ít nhất 1 sản phẩm để có thể thanh toán</p>
            <button
              className="return-btn"
              onClick={handleNavigateHome}
            >
              VỀ TRANG CHỦ
            </button>
          </div>
        ) : (
          <>
            <div>
              {cartItems}
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
    </>
  ), [cart, cartItems, isModal, qr, orderId, handleNavigateHome, setIsModal]);

  return (
    <Layout>
      {cartContent}
    </Layout>
  );
}

export default CartPage;
