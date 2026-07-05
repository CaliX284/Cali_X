import { Navigate } from "react-router-dom";
import useUser from "../Features/authentication/useUser";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading) return <Spinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
