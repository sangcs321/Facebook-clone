import LoginLayout from "@Layouts/LoginLayout";
import PublicLayout from "@Layouts/PublicLayout";
import HomeScreen from "@Pages/Facebook/Home/HomeScreen";
import Login from "@Pages/Facebook/Login/Login";
import Profile from "@Pages/Facebook/Profile/Profile";
import Register from "@Pages/Facebook/Register/Register";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Layout */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<LoginLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
