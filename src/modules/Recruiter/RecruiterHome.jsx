import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Row, Col, Input, message, Tabs } from "antd";
import { FaUserTie, FaUsers, FaSearch } from "react-icons/fa";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import RecruiterNavbar from "./RecruiterLayout/RecruiterNavbar";

const { Title, Text } = Typography;

export default function RecruiterHome() {
  const [activeTab, setActiveTab] = useState("register");
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => setFormVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const { fullName, email, mobile, password, confirmPassword, terms } = formData;

    if (!fullName || !email || !mobile || !password || !confirmPassword) {
      message.error("Please fill in all fields");
      return;
    }
    if (!terms) {
      message.error("You must agree to the Terms & Conditions");
      return;
    }
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    message.success("Registered successfully!");
    console.log("Form Data:", formData);

    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <RecruiterNavbar />

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

          {/* Register / Auth Form */}
          <div
            className={`md:w-96 bg-white text-gray-800 p-6 rounded-xl shadow-xl transform transition-transform duration-700 ease-out
              ${formVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              type="card"
              size="large"
              items={[
                {
                  key: "sales",
                  label: "Sales Enquiry",
                  children: <div className="p-4 text-gray-700"> {/* Sales enquiry form can go here */} </div>,
                },
                {
                  key: "register",
                  label: "Register",
                  children: (
                    <div className="flex flex-col gap-4 p-2">
                      {[
                        { label: "Full Name", name: "fullName", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Mobile Number", name: "mobile", type: "text" },
                        { label: "Password", name: "password", type: "password" },
                        { label: "Confirm Password", name: "confirmPassword", type: "password" },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="text-gray-600 text-sm font-medium mb-1 block">{field.label}</label>
                          <Input
                            type={field.type}
                            name={field.name}
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="rounded-md"
                            iconRender={
                              field.type === "password"
                                ? (visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)
                                : undefined
                            }
                          />
                        </div>
                      ))}

                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          name="terms"
                          id="terms"
                          checked={formData.terms}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <label htmlFor="terms" className="text-gray-600 text-sm">
                          I agree to the{" "}
                          <span className="text-blue-500 underline cursor-pointer">Terms & Conditions</span>
                        </label>
                      </div>

                      <Button
                        type="primary"
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleSubmit}
                      >
                        Register
                      </Button>

                      <Text className="block mt-4 text-center text-gray-500 text-sm">
                        Already have an account?{" "}
                        <span className="text-blue-500 underline cursor-pointer">Log in</span>
                      </Text>
                    </div>
                  ),
                },
              ]}
            />
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
