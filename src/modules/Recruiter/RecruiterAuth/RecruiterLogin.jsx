// src/modules/Recruiter/RecruiterAuth/RecruiterLogin.jsx
import React from "react";
import { Modal, Form, Input, Button, Typography, Divider } from "antd";
import { FaEnvelope, FaLock } from "react-icons/fa";

const { Title, Text } = Typography;

export default function RecruiterLogin({ open, onClose }) {
  const onFinish = (values) => {
    console.log("Recruiter Login Values:", values);
    // 🔑 API integration goes here
    onClose(); // close popup after success
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={450}>
      <div className="p-4">
        <Title level={3} className="text-center mb-6">
          Recruiter Login
        </Title>

        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input prefix={<FaEnvelope />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<FaLock />} placeholder="Enter your password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ background: "#16a34a", borderColor: "#16a34a" }}
            className="mt-2"
          >
            Login
          </Button>
        </Form>

        <Divider />

        <Text type="secondary">
          Don’t have an account?{" "}
          <a onClick={onClose} className="text-green-600 font-medium">
            Register here
          </a>
        </Text>
      </div>
    </Modal>
  );
}
