import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CenterContainer from "../layouts/CenterContainer";
import { LoaderPuff } from "../components/Loader";

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <CenterContainer><LoaderPuff /></CenterContainer>;

  return user ? <Navigate to="/dashboard" replace /> : children;
}
