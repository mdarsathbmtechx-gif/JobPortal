import React from "react";
import { Table, Tag, Button } from "antd";
import RecruiterNavbar from "../RecruiterLayout/RecruiterNavbar";

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Job Applied", dataIndex: "job", key: "job" },
  { title: "Status", dataIndex: "status", key: "status", render: status => {
      const color = status === "Selected" ? "green" : status === "Rejected" ? "red" : "orange";
      return <Tag color={color}>{status}</Tag>;
    }
  },
  { title: "Action", key: "action", render: (_, record) => (
      <Button type="link">View</Button>
    ) 
  },
];

const data = [
  { key: "1", name: "Rahul Sharma", email: "rahul@gmail.com", job: "Frontend Developer", status: "Pending" },
  { key: "2", name: "Ananya Singh", email: "ananya@gmail.com", job: "UI/UX Designer", status: "Selected" },
  { key: "3", name: "Karan Verma", email: "karan@gmail.com", job: "React Developer", status: "Rejected" },
];

export default function Applicants() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      <div className="mt-18 max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Applicants</h1>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
}
