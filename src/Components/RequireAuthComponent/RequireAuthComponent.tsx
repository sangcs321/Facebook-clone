import { RootState } from "@Store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
