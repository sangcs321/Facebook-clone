import BASE_URL from "@Constants/apiConfig.js";
import { setUser } from "@Redux/Slice/UserSlice";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import { a } from "framer-motion/dist/types.d-Bq-Qm38R";
import { UserApis } from "Apis/UserApis";
import { LanguageApis } from "Apis/LanguageApis";
import { RootState } from "@Redux/Store/Store";

export const LoginPage = () => {
  const translate = useSelector(
    (state: RootState) => state.language.TranslateModel
  );
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, values);
      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      if (token) {
        const userResponse = await UserApis.getUserById(userId);
        const user = userResponse.data;
        if (user.active) {
          message.error("Tài khoản của bạn đã bị chặn!");
          return;
        }
        dispatch(setUser(user));
        if (user.role === "USER") {
          navigate("/");
        } else {
          navigate("/languages");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      message.error("Đăng nhập không thành công!");
    }
  };
  return (
    <div className="container">
      <div className={styles.login}>
        <div className={styles.containerLogo}>
          <div className={styles.logo}>
            <img
              className="fb_logo _8ilh img"
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt="Facebook"
            />
          </div>
          <h2 className="title">
            FacebookFacebook giúp bạn kết nối và chia sẻ với mọi người trong
            cuộc sống của bạn.
          </h2>
        </div>
        <div className={styles.loginForm}>
          <Form
            form={form}
            name="loginForm"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
            >
              <Input
                placeholder="Nhập Email của bạn "
                className={styles.input}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}
            >
              <Input.Password placeholder="Mật khẩu" className={styles.input} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {translate?.login}
              </Button>
            </Form.Item>
            <Button type="link" href="/login">
              {translate?.forgetPassword}?
            </Button>
            <div className={styles.line}></div>
            <Button
              className={styles.createAccount}
              type="link"
              href="/register"
            >
              {translate?.createAccount}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
