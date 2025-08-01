// components/RequireAuth.tsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@Store";
import { JSX } from "react";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
