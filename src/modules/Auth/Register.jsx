// src/pages/Register.jsx
import React from "react";
import { Form, Input, Select, Button, Divider } from "antd";

export default function Register() {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log("Form Data:", values);
        // API call here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="mt-18 max-w-5xl w-full bg-white shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden">
                {/* Left Info Section */}
                <div className="w-full md:w-1/3 bg-gray-50 p-8 flex flex-col justify-center border-r">
                    <h2 className="text-xl font-semibold mb-6">On registering, you can</h2>
                    <ul className="space-y-4 text-gray-700">
                        <li>✅ Build your profile and let recruiters find you</li>
                        <li>✅ Get job postings delivered right to your email</li>
                        <li>✅ Find a job and grow your career</li>
                    </ul>
                </div>

                {/* Right Form Section */}
                <div className="w-full md:w-2/3 p-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Create your Job Portal profile
                    </h2>

                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={handleSubmit}
                        className="space-y-3"
                    >
                        <Form.Item
                            label="Full name"
                            name="fullName"
                            rules={[{ required: true, message: "Please enter your full name" }]}
                        >
                            <Input placeholder="What is your name?" />
                        </Form.Item>

                        <Form.Item
                            label="Email ID"
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email" },
                                { type: "email", message: "Enter a valid email" },
                            ]}
                        >
                            <Input placeholder="Tell us your Email ID" />
                        </Form.Item>
                        <p className="text-xs text-gray-500 -mt-2">
                            We’ll send relevant jobs and updates to this email
                        </p>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Please enter your password" },
                                { min: 6, message: "Password must be at least 6 characters" },
                            ]}
                        >
                            <Input.Password placeholder="(Minimum 6 characters)" />
                        </Form.Item>

                        <Form.Item
                            label="Mobile number"
                            name="mobile"
                            rules={[{ required: true, message: "Please enter your mobile number" }]}
                        >
                            <Input
                                addonBefore="+91"
                                placeholder="Enter your mobile number"
                            />
                        </Form.Item>
                        <p className="text-xs text-gray-500 -mt-2">
                            Recruiters will contact you on this number
                        </p>

                        <Form.Item
                            label="Work status"
                            name="workStatus"
                            rules={[{ required: true, message: "Please select your work status" }]}
                        >
                            <Select placeholder="Select your work status">
                                <Select.Option value="fresher">Fresher</Select.Option>
                                <Select.Option value="experienced">Experienced</Select.Option>
                            </Select>
                        </Form.Item>

                        {/* Green Register Button with hover effect */}
                        <Button
                            htmlType="submit"
                            block
                            type="default"
                            style={{
                                backgroundColor: '#008236',
                                color: 'white',
                                fontWeight: '600',
                                borderColor: '#008236',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006d28'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#008236'}
                        >
                            Register Now
                        </Button>
                    </Form>

                    {/* OR Google Login */}
                    <Divider plain>Or</Divider>
                    <Button
                        block
                        className="flex items-center justify-center gap-2 border border-gray-300 py-2"
                    >
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}
