// src/pages/RecruiterRegister.jsx
import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { FaUserTie, FaBuilding, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const { Title, Text } = Typography;

export default function RecruiterRegister() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Sales Enquiry Data:", values);
    // API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#004546] to-[#006d66] px-4 relative">
      {/* Header Section */}
      <div className="text-center text-white py-12 max-w-2xl">
        <Title level={1} className="text-4xl sm:text-5xl font-bold mb-4">
          Decode India's largest talent pool with the power of{" "}
          <span className="text-yellow-300">AI</span>
        </Title>
        <ul className="list-none space-y-2 text-lg">
          <li className="flex items-center justify-center gap-2">
            <span className="text-green-400">●</span> 10 crore+ registered jobseekers for all your talent needs
          </li>
          <li className="flex items-center justify-center gap-2">
            <span className="text-green-400">●</span> Most advanced recruitment AI
          </li>
        </ul>
        <Button
          type="primary"
          size="large"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          Explore our products
        </Button>
      </div>

      {/* Sales Enquiry Form */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-full max-w-xs bg-white p-6 rounded-xl shadow-2xl">
        <div className="text-center mb-6">
          <Text className="text-gray-500 font-semibold">Sales Enquiry</Text>
          <br />
          <Text className="text-gray-400 text-sm">Register / Log in</Text>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            label="Full name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input
              placeholder="Enter your name"
              size="large"
              className="rounded-lg"
              prefix={<FaUserTie className="text-gray-400" />}
            />
          </Form.Item>

          <Form.Item
            label="Mobile number"
            name="mobile"
            rules={[{ required: true, message: "Please enter your mobile number" }]}
          >
            <Input
              placeholder="Enter mobile number"
              size="large"
              className="rounded-lg"
              prefix={<FaPhoneAlt className="text-gray-400" />}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              placeholder="Enter email address"
              size="large"
              className="rounded-lg"
              prefix={<FaEnvelope className="text-gray-400" />}
            />
          </Form.Item>

          <Form.Item
            label="Hiring for"
            required
          >
            <Input.Group compact>
              <Form.Item
                name="hiringType"
                noStyle
                rules={[{ required: true, message: "Please enter company name" }]}
              >
                <Input
                  placeholder="Your company"
                  size="large"
                  className="rounded-l-lg w-1/2"
                  prefix={<FaBuilding className="text-gray-400" />}
                />
              </Form.Item>
              <Form.Item
                name="hiringConsultancy"
                noStyle
                rules={[{ required: true, message: "Please enter consultancy name" }]}
              >
                <Input
                  placeholder="Your consultancy"
                  size="large"
                  className="rounded-r-lg w-1/2"
                  prefix={<FaBuilding className="text-gray-400" />}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Request callback
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
