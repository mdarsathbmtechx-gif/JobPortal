import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Input, Upload, message, Avatar } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    location: "Chennai",
    avatar: "",
  });
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState(null);

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  const handleSave = () => {
    const updatedProfile = { ...profile, avatar: file ? URL.createObjectURL(file) : profile.avatar };
    setProfile(updatedProfile);
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
    message.success("Profile updated successfully!");
    setEditing(false);
  };

  const handleUpload = (file) => {
    setFile(file);
    message.success(`${file.name} selected`);
    return false; // prevent default upload
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-10 flex justify-center">
      <Card className="w-full md:w-3/4 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <Avatar size={120} src={file ? URL.createObjectURL(file) : profile.avatar} />
            <Upload beforeUpload={handleUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />} className="mt-4">Change Avatar</Button>
            </Upload>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <Title level={3} className="mb-0">{profile.name}</Title>
              <Button icon={<EditOutlined />} onClick={() => setEditing(!editing)}>
                {editing ? "Cancel" : "Edit"}
              </Button>
            </div>

            <div className="space-y-4">
              {["email","phone","location"].map((field) => (
                <div key={field}>
                  <Text strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</Text>
                  {editing ? (
                    <Input
                      value={profile[field]}
                      onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <Text className="ml-2">{profile[field]}</Text>
                  )}
                </div>
              ))}

              {editing && (
                <Button type="primary" onClick={handleSave} className="mt-4">
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="mt-10">
          <Title level={4} className="mb-4">Applied Jobs</Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Dummy jobs */}
            <Card hoverable className="bg-white p-4 rounded-lg shadow-md text-center">
              <Text className="font-semibold">Software Developer</Text>
              <Text className="block text-gray-600">Tech Company</Text>
            </Card>
            <Card hoverable className="bg-white p-4 rounded-lg shadow-md text-center">
              <Text className="font-semibold">UI/UX Designer</Text>
              <Text className="block text-gray-600">Design Studio</Text>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
