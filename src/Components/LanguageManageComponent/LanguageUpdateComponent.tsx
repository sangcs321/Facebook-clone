import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Alert, message } from "antd";
import axios from "axios";
import { LanguageModel } from "@Models";

interface LanguageUpdateProps {
  data: LanguageModel | null;
  onSuccess: () => void;
  onClose: () => void;
}
export const LanguageUpdate: React.FC<LanguageUpdateProps> = ({
  data,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);
  const onFinish = (values) => {
    axios
      .put(`http://localhost:8080/api/language`, values)
      .then((response) => {
        message.success("Cập nhật thành công!");
        onSuccess();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật ngôn ngữ:", error);
      });
  };
  return (
    <Form form={form} name="languageForm" onFinish={onFinish} layout="inline">
      <Form.Item
        name="code"
        rules={[{ required: true, message: "Vui lòng nhập mã ngôn ngữ!" }]}
      >
        <Input placeholder="Mã ngôn ngữ" value={data?.code} />
      </Form.Item>
      <Form.Item
        name="nameVi"
        rules={[{ required: true, message: "Vui lòng nhập tên đối tượng!" }]}
      >
        <Input placeholder="Tên đối tượng" value={data?.nameVi} />
      </Form.Item>
      <Form.Item name="nameEn">
        <Input placeholder="Giá trị" value={data?.nameEn} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};
