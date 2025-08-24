import {
  CreditCard,
  LogOutIcon,
  Package,
  Settings,
  ShoppingBag,
  Star,
  UserIcon,
} from "lucide-react";
import type { User } from "../../types/user";

interface MenuProfileProps {
  user: User;
  handleLogout: () => Promise<void>;
}

function MenuProfile({ user, handleLogout }: MenuProfileProps) {
  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li className="side-nav--active">
          <a href="#">
            <Settings /> Cài đặt
          </a>
        </li>
        <li>
          <a href="#">
            <ShoppingBag />
            Đơn hàng
          </a>
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
                <a href="#">
                  <Package />
                  Quản lý sản phẩm
                </a>
              </li>
              <li>
                <a href="#">
                  <UserIcon />
                  Quản lý người dùng
                </a>
              </li>
              <li>
                <a href="#">
                  <Star />
                  Quản lý đánh giá
                </a>
              </li>
              <li>
                <a href="#">
                  <ShoppingBag />
                  Quản lý đơn hàng
                </a>
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
