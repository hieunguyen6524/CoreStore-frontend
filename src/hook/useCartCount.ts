import { useEffect } from "react";
import { getCart } from "../services/cartService";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { setCartCount } from "../store/cartSlice";

export function useCartCount() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);

  useEffect(() => {
    if (!user) {
      dispatch(setCartCount(0));
      return;
    }

    (async () => {
      const cart = await getCart();
      const totalCount = cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
      dispatch(setCartCount(totalCount));
    })();
  }, [user, dispatch]);

  return cartCount;
}
