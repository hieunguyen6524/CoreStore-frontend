import {
  CreditCard,
  LogOutIcon,
  Package,
  Settings,
  ShoppingBag,
  Star,
  UserIcon,
} from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import type { User } from "../../types/user";

interface MenuProfileProps {
  user: User;
  handleLogout: () => Promise<void>;
}

function MenuProfile({ user, handleLogout }: MenuProfileProps) {
  const location = useLocation();

  const isActive = useCallback((path: string) => {
    return location.pathname === path ? "side-nav--active" : "";
  }, [location.pathname]);

  const isAdmin = useMemo(() => user.role === "admin", [user.role]);

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
      </ul>

      {/* Chỉ hiển thị nếu role = admin  */}
      {isAdmin ? (
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

export default memo(MenuProfile);
