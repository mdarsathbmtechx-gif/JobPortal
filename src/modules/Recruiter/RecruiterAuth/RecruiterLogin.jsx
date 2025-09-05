// src/modules/Recruiter/RecruiterAuth/RecruiterLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input, Button, Divider, Typography } from "antd";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const { Title, Link } = Typography;

export default function RecruiterLogin({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (values.email && values.password) {
        // ✅ Save recruiter info
        localStorage.setItem(
          "recruiter",
          JSON.stringify({ email: values.email })
        );

        onClose(); // close modal
        navigate("/recruiter-dashboard"); // ✅// redirect recruiter to dashboard
      } else {
        alert("Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="!p-0"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Info Section */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 flex flex-col justify-center border-r">
          <Title level={4} className="!mb-4">
            Welcome Recruiter!
          </Title>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>Post jobs quickly and easily</li>
            <li>Access a wide pool of jobseekers</li>
            <li>Manage applicants efficiently</li>
          </ul>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-2/3 p-6">
          <Title level={3} className="!mb-4 text-gray-800">
            Recruiter Login
          </Title>

          <Form layout="vertical" onFinish={handleSubmit} className="space-y-3">
            <Form.Item
              label="Email ID"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                prefix={<FaEnvelope className="text-gray-400" />}
                placeholder="Enter your Email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                prefix={<FaLock className="text-gray-400" />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <div className="flex justify-end mb-2">
              <Link href="#" className="text-sm">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size="large"
              className="!bg-green-600 hover:!bg-green-700 font-semibold"
            >
              Login
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
            New recruiter?{" "}
            <a href="/recruiter-register" className="text-green-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
