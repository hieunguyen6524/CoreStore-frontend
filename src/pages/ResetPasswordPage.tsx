import AuthForm from "../components/Authentication/AuthenForm";
import { resetPassword } from "../services/authService";

function ResetPasswordPage() {
  async function handleResetPassword(
    token: string,
    passsword: string,
    passwordConfirm: string
  ) {
    await resetPassword(token, passsword, passwordConfirm);
  }

  return <AuthForm mode="resetPassword" onSubmit={handleResetPassword} />;
}

export default ResetPasswordPage;
