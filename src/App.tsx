import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { fetchCurrentUser } from "./services/authService";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import ProductsPage from "./pages/ProductsPage";

function ProtectedRoutes() {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  return isLogin ? <Outlet /> : <Navigate to="/login" replace={false} />;
}

function RejectedRoutes() {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  return !isLogin ? <Outlet /> : <Navigate to="/" replace={false} />;
}

function App() {
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RejectedRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route
              path="/resetPassword/:token"
              element={<ResetPasswordPage />}
            />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/category/:slug" element={<ProductsPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/me" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1f1f1f", // Màu tối sang trọng
            color: "#fff", // Chữ trắng
            fontSize: "1.4rem", // Cỡ chữ vừa đọc
            borderRadius: "8px", // Bo góc mềm mại
            padding: "12px 16px", // Khoảng cách trong
            fontWeight: 500, // Chữ đậm vừa
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Đổ bóng nhẹ
          },
          success: {
            iconTheme: {
              primary: "#4caf50", // Xanh lá đẹp cho success
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f44336", // Đỏ tươi cho error
              secondary: "#fff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#2196f3", // Xanh dương cho loading
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
