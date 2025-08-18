import AuthForm from "../components/Authentication/AuthenForm";
import { login } from "../services/authService";

function LoginPage() {
  async function handleLogin(email: string, password: string) {
    await login(email, password);
  }

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
export default LoginPage;
