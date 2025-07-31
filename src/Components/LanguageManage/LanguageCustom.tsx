import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
const LanguageCustom = ({ data, onSuccess }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form]);
    const onFinish = (values) => {
        console.log('Thêm Custom:', values);
        axios.post('http://localhost:8080/api/custom', values)
            .then(response => {
                message.success('Thêm Custom thành công!');
                form.resetFields();
                onSuccess();
            })
            .catch(error => {
                console.error('Lỗi khi thêm Custom:', error);
            });
    };
    return (
        <Form form={form} name="customForm" onFinish={onFinish} layout="inline">
            <Form.Item name="code">
                <Input placeholder="Nhập tên đối tượng" readOnly />
            </Form.Item>
            <Form.Item name="company" rules={[{ required: true, message: "Vui lòng nhập công ty!" }]}>
                <Input placeholder="Nhập Công ty" />
            </Form.Item>
            <Form.Item name="nameVi" rules={[{ required: true, message: "Vui lòng nhập tiếng Việt" }]}>
                <Input placeholder="Nhập tiếng Việt" />
            </Form.Item>
            <Form.Item name="nameEn">
                <Input placeholder="Nhập tiếng Anh" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Custom
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LanguageCustom;