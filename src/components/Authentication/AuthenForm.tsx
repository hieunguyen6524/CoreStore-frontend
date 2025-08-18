import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

type LoginSubmit = (email: string, password: string) => Promise<void>;
type SignupSubmit = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => Promise<void>;

type ForgotPasswordSubmit = (email: string) => Promise<void>;

type ResetPasswordSubmit = (
  token: string,
  password: string,
  confirmPassword: string
) => Promise<void>;

type AuthFormProps =
  | { mode: "login"; onSubmit: LoginSubmit }
  | { mode: "signup"; onSubmit: SignupSubmit }
  | { mode: "forgotPassword"; onSubmit: ForgotPasswordSubmit }
  | { mode: "resetPassword"; onSubmit: ResetPasswordSubmit };

function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const navigate = useNavigate();
  const { token } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  function handleNavigateSignup() {
    navigate("/signup");
  }

  function handleNavigateLogin() {
    navigate("/login");
  }

  function handleNavigateForgotPassword() {
    navigate("/forgotPassword");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === "login") {
      await onSubmit(email, password);
    }
    if (mode === "signup") {
      //   console.log(name, email, password, passwordConfirm);
      await onSubmit(name, email, password, passwordConfirm);
    }
    if (mode === "forgotPassword") {
      await onSubmit(email);
    }
    if (mode === "resetPassword" && token) {
      await onSubmit(token, password, passwordConfirm);
    }

    setLoading(false);
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="login__avatar">
        <img src="/logo.svg" alt="logo" />
      </div>

      <div className="login__box">
        <h2 className="login__title">
          {mode === "login"
            ? "Đăng nhập"
            : mode === "signup"
            ? "Tạo tài khoản"
            : "Quên mật khẩu"}
        </h2>

        {mode === "signup" && (
          <>
            <label className="login__label">Tên</label>
            <input
              className="login__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}
        {mode !== "resetPassword" && (
          <>
            <label className="login__label">Email</label>
            <input
              className="login__input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        {mode === "login" || mode === "signup" || mode === "resetPassword" ? (
          <>
            <label className="login__label">Mật khẩu</label>
            <input
              className="login__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : null}

        {mode === "signup" || mode === "resetPassword" ? (
          <>
            <label className="login__label">Xác nhận mật khẩu</label>
            <input
              className="login__input"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </>
        ) : null}

        <button
          type="submit"
          className={`login__btn ${loading ? "login__btn--disabled" : ""}`}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : mode === "login"
            ? "Log in"
            : mode === "signup"
            ? "Sign up"
            : "Submit"}
        </button>

        {mode === "login" && (
          <div className="login__links">
            <a href="#" className="login__link">
              Vấn đề với đăng nhập
            </a>
            <a
              // href="#"
              className="login__link"
              onClick={handleNavigateForgotPassword}
            >
              Quên mật khẩu
            </a>
          </div>
        )}
      </div>

      {mode === "login" && (
        <button
          type="button"
          className="login__btn login__btn--outline"
          onClick={handleNavigateSignup}
        >
          Create an account
        </button>
      )}

      {mode === "signup" && (
        <button
          type="button"
          className="login__btn login__btn--outline"
          onClick={handleNavigateLogin}
        >
          Log in
        </button>
      )}
    </form>
  );
}
export default AuthForm;
