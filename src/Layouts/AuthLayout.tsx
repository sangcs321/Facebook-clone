import { Outlet } from "react-router-dom";
import GuestRoute from "Routes/GuestRoute";

export const AuthLayout = () => {
  return (
    <>
      <GuestRoute>
        <main>
          <Outlet />
        </main>
      </GuestRoute>
    </>
  );
};
