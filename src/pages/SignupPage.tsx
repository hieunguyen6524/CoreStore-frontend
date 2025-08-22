import AuthForm from "../components/Authentication/AuthenForm";
import { signup } from "../services/authService";

function SignupPage() {
  async function handleSignup(
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) {
    await signup(name, email, password, passwordConfirm);
  }

  return <AuthForm mode="signup" onSubmit={handleSignup} />;
}

export default SignupPage;
