import { useEffect, useRef } from "react";
import { getCart } from "../services/cartService";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import type { RootState } from "../store/store";
import { setCartCount } from "../store/cartSlice";

export function useCartCount() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual);
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);
  const isFetchingRef = useRef(false);
  const userRef = useRef(user);

  // Chỉ update ref khi user thực sự thay đổi
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    const currentUser = userRef.current;
    if (!currentUser) {
      dispatch(setCartCount(0));
      return;
    }

    // Tránh gọi API nhiều lần cùng lúc
    if (isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    (async () => {
      try {
        const cart = await getCart();
        const totalCount = cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
        dispatch(setCartCount(totalCount));
      } finally {
        isFetchingRef.current = false;
      }
    })();
  }, [user?.id, dispatch]); // Chỉ phụ thuộc vào user.id thay vì toàn bộ user object

  return cartCount;
}
