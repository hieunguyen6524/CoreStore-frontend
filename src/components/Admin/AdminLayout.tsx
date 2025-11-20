import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  FolderTree,
  Tag,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../services/authService";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const isActive = (path: string) => {
    return location.pathname === path ? "admin-nav__item--active" : "";
  };

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/products", icon: Package, label: "Sản phẩm" },
    { path: "/admin/users", icon: Users, label: "Người dùng" },
    { path: "/admin/orders", icon: ShoppingBag, label: "Đơn hàng" },
    { path: "/admin/categories", icon: FolderTree, label: "Danh mục" },
    { path: "/admin/brands", icon: Tag, label: "Thương hiệu" },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <h2 className="admin-sidebar__title">Admin Panel</h2>
          {user && (
            <p className="admin-sidebar__user">{user.name}</p>
          )}
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav__item ${isActive(item.path)}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-nav__item">
            <span>← Về trang chủ</span>
          </Link>
          <button
            onClick={handleLogout}
            className="admin-nav__item admin-nav__item--logout"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayout;

