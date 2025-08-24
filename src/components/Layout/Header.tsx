import { ShoppingCart, UserIcon } from "lucide-react";
import SearchBox from "../../ui/SearchBox";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../../store/store";
function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // console.log(user);

  return (
    <header className="header">
      <div
        className="header__logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/logo.svg" alt="Logo" className="logo-img" />
      </div>

      {/* <nav className="header__nav">
        <a href="#">Shop</a>
        <a href="#">On Sale</a>
        <a href="#">New Arrivals</a>
        <a href="#">Brands</a>
      </nav> */}
      <SearchBox />

      <div className="header__icons">
        {user ? (
          <>
            <ShoppingCart
              size={30}
              onClick={() => navigate("/cart")}
              style={{ cursor: "pointer" }}
            />

            <div className="avatar" onClick={() => navigate("/me")}>
              <img src={user.avatar} alt="Avatar" />
            </div>
          </>
        ) : (
          <div className="login" onClick={() => navigate("/login")}>
            <UserIcon />
            <div className="login-text">
              <span>Đăng nhập</span>
              <span>Đăng ký</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
