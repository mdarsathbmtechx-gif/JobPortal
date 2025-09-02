// src/pages/Login.jsx
import React, { useState } from "react";
import { Form, Input, Button, Divider, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Text, Link } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", values);
      alert("Login successful!");
      console.log("User data:", response.data);
    } catch (error) {
      console.error(error);
      alert("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <Form layout="vertical" onFinish={handleSubmit}>
          {/* Email */}
          <Form.Item
            label="Email ID / Username"
            name="email"
            rules={[{ required: true, message: "Please enter your email/username" }]}
          >
            <Input placeholder="Enter your active Email / Username" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <div className="flex justify-end mb-4">
            <Link href="#" className="text-sm">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ backgroundColor: "#2563EB" }} // blue like Naukri
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {/* OTP Login */}
        <div className="text-center mb-4">
          <Link href="#" className="text-sm font-medium">
            Use OTP to Login
          </Link>
        </div>

        <Divider>Or</Divider>

        {/* Google Button */}
        <Button block icon={<GoogleOutlined />} size="large">
          Sign in with Google
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          New to our platform?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register for free
          </a>
        </p>
      </div>
    </div>
  );
}
