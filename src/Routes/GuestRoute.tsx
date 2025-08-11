import { RootState } from "@Redux/Store/Store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  return user ? <Navigate to="/" replace /> : children;
};

export default GuestRoute;
