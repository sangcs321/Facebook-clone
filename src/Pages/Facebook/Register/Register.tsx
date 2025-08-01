import React from 'react';
import styles from "./Register.module.scss";
import { Form, Input, message, Button } from 'antd';
import axios from 'axios';


function Register() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('register:', values);
        axios.post('http://localhost:8080/api/auth/register', values)
            .then(response => {
                message.success('Đăng ký thành công!')
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            })
            .catch(error => {
                console.error('Register error:', error.response.data);
                message.error('Đăng ký không thành công: ' + error.response.data);
            });
    };
    return (
        <div className={styles.container}>
            <div className={styles.register}>
                <div className={styles.containerLogoRegister}>
                    <div className="logo">
                        <img className="fb_logo _8ilh img" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook" />
                    </div>
                </div>
                <div className={styles.registerForm}>
                    <Form form={form} name="registerForm" onFinish={onFinish} layout="vertical">
                        <Form.Item name="name" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
                            <Input placeholder="Nhập tên của bạn " className={styles.input}/>
                        </Form.Item>
                        <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập Email!" },
                        { type: "email", message: "Email không hợp lệ!" }]}>
                            <Input placeholder="Nhập Email của bạn " className={styles.input}/>
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập Mật khẩu!" }]}>
                            <Input.Password placeholder="Mật khẩu" className={styles.passwordInput} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.button}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;