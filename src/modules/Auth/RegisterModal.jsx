import React from "react";
import { Modal, Form, Input, Button, Typography } from "antd";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const { Title, Text } = Typography;

export default function RegisterModal({ visible, onClose }) {
  const onFinish = (values) => {
    console.log("Jobseeker Register Values:", values);
    // 🔑 Hook API integration here
    onClose(); // close after submit
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      destroyOnClose
    >
      <Title level={3} className="text-center mb-6">
        Jobseeker Register
      </Title>

      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input prefix={<FaUser />} placeholder="Enter your name" />
        </Form.Item>

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
        >
          Register
        </Button>
      </Form>

      <div className="text-center mt-4">
        <Text type="secondary">
          Already have an account?{" "}
          <button
            className="text-green-600 font-medium"
            onClick={() => {
              onClose();
              // 🚀 Optionally: open Login modal from Navbar state
            }}
          >
            Login here
          </button>
        </Text>
      </div>
    </Modal>
  );
}
