import AuthForm from "../components/Authentication/AuthenForm";
import { forgotPassword } from "../services/authService";

function ForgotPasswordPage() {
  async function handleForgotPassword(email: string) {
    await forgotPassword(email);
  }
  return <AuthForm mode="forgotPassword" onSubmit={handleForgotPassword} />;
}

export default ForgotPasswordPage;
