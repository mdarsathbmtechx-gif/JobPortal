// src/components/RegisterModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input, Button, Divider, Typography } from "antd";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const { Title, Link } = Typography;

export default function RegisterModal({ visible, onClose }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // 🔹 Fake registration (no backend yet)
      if (values.name && values.email && values.password) {
        // save to localStorage so we know user is registered/logged in
        localStorage.setItem(
          "user",
          JSON.stringify({ name: values.name, email: values.email })
        );

        onClose(); // close modal
        navigate("/user-dashboard"); // redirect
      } else {
        alert("Please fill in all required fields.");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible} // in AntD v5, use `open` instead of `visible`
      onCancel={onClose}
      destroyOnHidden
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Info Section */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 flex flex-col justify-center border-r">
          <Title level={4} className="!mb-4">Join Us!</Title>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>Access thousands of jobs instantly</li>
            <li>Stay updated with latest job postings</li>
            <li>Start your career journey today</li>
          </ul>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-2/3 p-6">
          <Title level={3} className="!mb-4 text-gray-800">
            Create your account
          </Title>

          <Form layout="vertical" onFinish={handleSubmit} className="space-y-3">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter your full name" }]}
            >
              <Input prefix={<FaUser className="text-gray-400" />} placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email ID"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<FaEnvelope className="text-gray-400" />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter a password" }]}
            >
              <Input.Password prefix={<FaLock className="text-gray-400" />} placeholder="Enter your password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size="large"
              className="!bg-green-600 hover:!bg-green-700 font-semibold"
            >
              Register
            </Button>
          </Form>

          <Divider plain>Or</Divider>
          <Button
            block
            size="large"
            className="flex items-center justify-center gap-2 !bg-white hover:!bg-gray-50 border border-gray-300 font-medium"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
