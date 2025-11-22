import { ShoppingCart, UserIcon } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import SearchBox from "../../ui/SearchBox";
import { useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { getUserImageUrl } from "../../utils/imageUrl";

import type { RootState } from "../../store/store";

// Tách CartBadge ra component riêng để tránh re-render Header
function CartBadge() {
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);
  
  if (cartCount <= 0) return null;
  
  return <span className="cart-badge">{cartCount}</span>;
}

const MemoizedCartBadge = memo(CartBadge);

function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual);
  
  // Memoize user avatar URL để tránh re-render
  const userAvatarUrl = useMemo(() => 
    user ? getUserImageUrl(user.avatar) : null,
    [user?.avatar]
  );

  // console.log(user);

  const handleLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleCartClick = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const handleProfileClick = useCallback(() => {
    navigate("/me");
  }, [navigate]);

  const handleLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <header className="header">
      <div
        className="header__logo"
        onClick={handleLogoClick}
      >
        <img src="/logo.svg" alt="Logo" className="logo-img" />
      </div>

      <SearchBox />

      <div className="header__icons">
        {user ? (
          <>
            <div className="cart-icon-wrapper">
              <ShoppingCart
                size={30}
                onClick={handleCartClick}
                style={{ cursor: "pointer" }}
              />
              <MemoizedCartBadge />
            </div>

            <div className="avatar" onClick={handleProfileClick}>
              <img src={userAvatarUrl || ""} alt="Avatar" />
            </div>
          </>
        ) : (
          <div className="login" onClick={handleLoginClick}>
            <UserIcon />
            <div className="login-text">
              <span>Đăng nhập/</span>
              <span>Đăng ký</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default memo(Header);
