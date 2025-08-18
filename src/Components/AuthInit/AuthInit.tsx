// src/components/AuthInit.tsx
import { setUser } from "@Redux/Slice/UserSlice";
import { message } from "antd";
import { UserApis } from "Apis/UserApis";
import { LoadingComponent } from "@Components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LanguageApis } from "Apis/LanguageApis";
import { setLanguages } from "@Redux/Slice/LanguageSlice";

export const AuthInit = ({ children }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const userIdStr = localStorage.getItem("userId");
    const userId = userIdStr ? Number(userIdStr) : null;
    const languageResponse = await LanguageApis.getValueLanguage();
    const language = languageResponse.data;
    dispatch(setLanguages(language));
    if (token && userId) {
      try {
        // await bình thường được ở đây
        const response = await UserApis.getUserById(userId);

        const user = response.data;
        if (user.active) {
          message.error("Tài khoản của bạn đã bị chặn!");
          return;
        }
        dispatch(setUser(user));
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <LoadingComponent />;

  return children;
};
