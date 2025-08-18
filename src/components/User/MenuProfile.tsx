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
            <Settings /> Settings
          </a>
        </li>
        <li>
          <a href="/my-tours">
            <ShoppingBag />
            Order
          </a>
        </li>
        <li>
          <a href="#">
            <Star />
            My reviews
          </a>
        </li>
        <li>
          <a href="#">
            <CreditCard />
            Billing
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
                  Manage products
                </a>
              </li>
              <li>
                <a href="#">
                  <UserIcon />
                  Manage users
                </a>
              </li>
              <li>
                <a href="#">
                  <Star />
                  Manage reviews
                </a>
              </li>
              <li>
                <a href="#">
                  <ShoppingBag />
                  Manage order
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
            Log out
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default MenuProfile;
