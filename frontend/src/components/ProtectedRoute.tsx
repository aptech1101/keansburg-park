import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext"


interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
    const { user, token, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (isAdmin && user.role !== "admin") return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
