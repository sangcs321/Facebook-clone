import React from 'react';
import "./Login.css";
import { Form, Input, message, Button } from 'antd';
import axios from 'axios';
import BASE_URL from '../../../Constants/apiConfig.js'
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Redux/Slice/User';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = (values) => {
        axios.post(`${BASE_URL}/api/auth/login`, values)
            .then(response => {
                const token = response.data.token;
                const userId = response.data.userId;
                sessionStorage.setItem('token', token);
                if (token) {
                    axios.get(`${BASE_URL}/api/user/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then(response => {
                        const user = response.data;
                        if (user.active) {
                            message.error("Tài khoản của bạn đã bị chặn!");
                            return;
                        }
                        dispatch(setUser(user));
                        if (user.role === 'USER') {
                            navigate("/")
                        } else {
                            navigate("/languages")
                        }
                    }).catch(err => {
                        console.log('Error: ', err);
                        message.error('Đăng nhập không thành công!');
                    })
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                message.error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập của bạn.');
            });
    };
    return (
        <div className="container">
            <div className="login">
                <div className="containerLogo">
                    <div className="logo">
                        <img className="fb_logo _8ilh img" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook" />
                    </div>
                    <h2 className="title">FacebookFacebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</h2>
                </div>
                <div className="loginForm">
                    <Form form={form} name="loginForm" onFinish={onFinish} layout="vertical">
                        <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập Email!" }]}>
                            <Input placeholder="Nhập Email của bạn " />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}>
                            <Input.Password placeholder="Mật khẩu" className="password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                        <Button type="link" href="/login">
                            Quên mật khẩu?
                        </Button>
                        <div className="line"></div>
                        <Button className="create-account" type="link" href="/register">
                            Tạo tài khoản mới
                        </Button>
                    </Form>

                </div>
            </div>
        </div>
    );
}

export default Login