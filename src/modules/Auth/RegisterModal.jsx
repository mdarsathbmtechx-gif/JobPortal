// src/components/RegisterModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input, Button, Divider, Typography } from "antd";
import { FaUser, FaPhone, FaEnvelope, FaKey } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/firebase"; // adjust path if needed

const { Title } = Typography;

export default function RegisterModal({ visible, onClose }) {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const navigate = useNavigate();

  const handleSendOtp = (phone) => {
    if (!phone) {
      alert("Please enter your phone number first.");
      return;
    }
    // 🔹 Fake OTP generator (normally this would be backend API)
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert(`Your OTP is: ${otp} (for demo only)`);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (values.fullName && values.phone && values.email && values.otp) {
        if (parseInt(values.otp) !== generatedOtp) {
          alert("Invalid OTP. Please try again.");
          setLoading(false);
          return;
        }

        // Save user locally (fake register flow)
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: values.fullName,
            phone: values.phone,
            email: values.email,
          })
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
    <Modal open={visible} onCancel={onClose} destroyOnClose footer={null}>
      <div className="flex flex-col md:flex-row">
        {/* Left Info Section */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 flex flex-col justify-center border-r">
          <Title level={4} className="!mb-4">Join Us!</Title>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>Create your account with OTP</li>
            <li>Apply to jobs instantly</li>
            <li>Stay updated with latest opportunities</li>
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
              name="fullName"
              rules={[{ required: true, message: "Please enter your full name" }]}
            >
              <Input prefix={<FaUser className="text-gray-400" />} placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Please enter your phone number" }]}
            >
              <Input prefix={<FaPhone className="text-gray-400" />} placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<FaEnvelope className="text-gray-400" />} placeholder="Enter your email" />
            </Form.Item>

            {/* OTP Field with Send OTP Button */}
            <Form.Item label="OTP" name="otp" rules={[{ required: true, message: "Please enter the OTP" }]}>
              <div className="flex gap-2">
                <Input prefix={<FaKey className="text-gray-400" />} placeholder="Enter OTP" />
                <Button
                  type="primary"
                  className="!bg-blue-600 hover:!bg-blue-700"
                  onClick={() => {
                    const phone = document.querySelector("input[name='phone']").value;
                    handleSendOtp(phone);
                  }}
                >
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </div>
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
  onClick={async () => {
    try {
      const user = await signInWithGoogle();
      onClose(); // close modal
      navigate("/user-dashboard"); // redirect
    } catch (error) {
      console.error(error);
    }
  }}
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
