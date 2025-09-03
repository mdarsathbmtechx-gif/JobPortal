import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Row, Col, Input } from "antd";
import { FaUserTie, FaUsers, FaSearch } from "react-icons/fa";

const { Title, Text } = Typography;

export default function RecruiterHome() {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFormVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 to-teal-600 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between py-20 px-6">
          {/* Hero Text */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Title level={1} className="text-4xl md:text-5xl font-extrabold leading-snug mb-6">
              Decode India's largest talent pool with the power of{" "}
              <span className="text-yellow-300">AI</span>
            </Title>
            <Text className="text-lg md:text-xl text-green-100 mb-6 block">
              <span className="font-semibold">10 crore+</span> registered jobseekers for your talent needs.
              <br />
              Most advanced recruitment AI.
            </Text>
            <Button
              type="primary"
              size="large"
              className="bg-yellow-400 text-gray-900 font-semibold rounded-lg px-8 py-3 hover:bg-yellow-500"
            >
              Explore Products
            </Button>
          </div>

          {/* Sales Enquiry Form */}
          <div
            className={`md:w-96 bg-white text-gray-800 p-6 rounded-xl shadow-xl transform transition-transform duration-700 ease-out
              ${formVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            <Text className="font-bold text-lg block mb-4">Sales Enquiry</Text>

            {["Full Name", "Mobile Number", "Email"].map((label, index) => (
              <div
                key={label}
                className={`mb-3 transition-opacity duration-700 ease-out ${
                  formVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <label className="text-gray-600 text-sm font-medium mb-1 block">{label}</label>
                <Input placeholder={`Enter your ${label.toLowerCase()}`} className="rounded-md" />
              </div>
            ))}

            {/* Hired For Section */}
            <div
              className={`mb-4 transition-opacity duration-700 ease-out ${
                formVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "450ms" }}
            >
              <Text className="text-gray-600 text-sm font-medium block mb-1">Hired For</Text>
              <div className="flex gap-2">
                <Input placeholder="Your Company" className="rounded-md" />
                <Input placeholder="Your Consultancy" className="rounded-md" />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="primary"
              size="large"
              className={`bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg w-full mt-2 transition-opacity duration-700 ease-out ${
                formVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              Request Callback
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card className="flex items-center gap-4 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <FaUsers className="text-5xl text-green-500" />
              <div>
                <Text className="text-gray-500">Registered Jobseekers</Text>
                <Title level={3}>10 Crore+</Title>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="flex items-center gap-4 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <FaUserTie className="text-5xl text-blue-500" />
              <div>
                <Text className="text-gray-500">AI-Powered Hiring</Text>
                <Title level={3}>Advanced Tools</Title>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="flex items-center gap-4 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <FaSearch className="text-5xl text-yellow-500" />
              <div>
                <Text className="text-gray-500">Smart Candidate Search</Text>
                <Title level={3}>Instant Matches</Title>
              </div>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
}
