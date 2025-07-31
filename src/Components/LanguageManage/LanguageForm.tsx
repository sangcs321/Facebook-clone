import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
const LanguageForm = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const [ButtonText, setButtonText] = useState('');
    const [code, setCode] = useState('');
    const [nameVi, setNameVi] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [requireCode, setRequireCode] = useState('');
    const [requireNameVi, setRequireNameVi] = useState('');
    const fetchLanguages = () => {
        axios.get("http://localhost:8080/api/language/search?keyword=AddForm")
            .then((response) => {
                setButtonText(response.data.find(item => item.code === 'AddFormButton')?.name  || '');
                setCode(response.data.find(item => item.code === 'AddFormPlaceHolderCode')?.name || '');
                setNameEn(response.data.find(item => item.code === 'AddFormPlaceHolderNameEn')?.name || '');
                setNameVi(response.data.find(item => item.code === 'AddFormPlaceHolderNameVi')?.name || '');
                setRequireCode(response.data.find(item => item.code === 'AddFormCodeRequire')?.name || '');
                setRequireNameVi(response.data.find(item => item.code === 'AddFormNameViRequire')?.name || '');
            })
            .catch((error) => {
                console.error("Error fetching languages:", error);
            });
    };
    useEffect(() => {
        fetchLanguages();
    }, []);
    const onFinish = (values) => {
        console.log('Thêm ngôn ngữ:', values);
        axios.post('http://localhost:8080/api/language', values)
            .then(response => {
                message.success('Thêm ngôn ngữ thành công!');
                form.resetFields();
                 if (onSuccess) onSuccess(values); 
            })
            .catch(error => {
                console.error('Lỗi khi thêm ngôn ngữ:', error);
            });
    };
    return (
        <Form form={form} name="languageForm" onFinish={onFinish} layout="inline">
            <Form.Item name="code" rules={[{ required: true, message: requireCode }]}>
                <Input placeholder={`${code}`} />
            </Form.Item>
            <Form.Item name="nameVi" rules={[{ required: true, message: requireNameVi }]}>
                <Input placeholder={`${nameVi}`} />
            </Form.Item>
            <Form.Item name="nameEn">
                <Input placeholder={`${nameEn}`} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {ButtonText}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LanguageForm;