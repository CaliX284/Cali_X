import LoginForm from "../Features/authentication/LoginForm";
import useUser from "../Features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading) return <Spinner />;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LoginForm />;
}
