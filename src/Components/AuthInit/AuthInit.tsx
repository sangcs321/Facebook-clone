// src/components/AuthInit.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import BASE_URL from "@Constants/apiConfig.js";
import { message } from "antd";
import { setUser } from "@Redux/Slice/UserSlice";

export const AuthInit = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      axios
        .get(`${BASE_URL}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const user = res.data;
          if (user.active) {
            message.error("Tài khoản của bạn đã bị chặn!");
            return;
          }
          dispatch(setUser(user));
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch]);
  if (loading) return <div>Loading...</div>;
  return children;
};
