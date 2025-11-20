import {
  CreditCard,
  LogOutIcon,
  Package,
  Settings,
  ShoppingBag,
  Star,
  UserIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { User } from "../../types/user";

interface MenuProfileProps {
  user: User;
  handleLogout: () => Promise<void>;
}

function MenuProfile({ user, handleLogout }: MenuProfileProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "side-nav--active" : "";
  };

  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li className={isActive("/me")}>
          <Link to="/me">
            <Settings /> Cài đặt
          </Link>
        </li>
        <li className={isActive("/my-orders")}>
          <Link to="/my-orders">
            <ShoppingBag />
            Đơn hàng
          </Link>
        </li>
        <li>
          <a href="#">
            <Star />
            Đánh giá
          </a>
        </li>
        <li>
          <a href="#">
            <CreditCard />
            Hóa đơn
          </a>
        </li>
      </ul>

      {/* Chỉ hiển thị nếu role = admin  */}
      {user.role === "admin" ? (
        <>
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <li>
                <Link to="/admin">
                  <Settings />
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : null}

      <ul className="side-nav">
        <li>
          <a onClick={handleLogout}>
            <LogOutIcon />
            Đăng xuất
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default MenuProfile;
