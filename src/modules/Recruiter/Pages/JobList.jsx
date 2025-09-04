import React from "react";
import { Table, Button, Tag } from "antd";
import RecruiterNavbar from "../RecruiterLayout/RecruiterNavbar";

const columns = [
  { title: "Job Title", dataIndex: "title", key: "title" },
  { title: "Company", dataIndex: "company", key: "company" },
  { title: "Location", dataIndex: "location", key: "location" },
  { title: "Type", dataIndex: "type", key: "type", render: type => <Tag color="blue">{type}</Tag> },
  { title: "Applicants", dataIndex: "applicants", key: "applicants" },
  { title: "Action", key: "action", render: (_, record) => (
      <Button type="link">View</Button>
    ) 
  },
];

const data = [
  { key: "1", title: "Frontend Developer", company: "ABC Tech", location: "Mumbai", type: "Full-time", applicants: 12 },
  { key: "2", title: "UI/UX Designer", company: "XYZ Solutions", location: "Bangalore", type: "Part-time", applicants: 5 },
  { key: "3", title: "React Developer", company: "TechNova", location: "Hyderabad", type: "Full-time", applicants: 8 },
];

export default function JobList() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      <div className="mt-18 max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Posted Jobs</h1>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
}
