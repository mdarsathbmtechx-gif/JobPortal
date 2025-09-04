import React, { useState, useEffect } from "react";
import { Card, Checkbox, Select, Button, Typography, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import LoginModal from "../../Auth/LoginModal";
import RegisterModal from "../../Auth/RegisterModal";

const { Title, Text } = Typography;

export default function Jobs() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [qualification, setQualification] = useState([]);
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsRes = await axios.get("/Jobs.json");
        const categoriesRes = await axios.get("/Categories.json");
        setJobs(Array.isArray(jobsRes.data.jobs) ? jobsRes.data.jobs : []);
        setCategories(Array.isArray(categoriesRes.data.topics) ? categoriesRes.data.topics : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setJobs([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (qualification.length === 0 || qualification.includes(job.qualification)) &&
      (jobType === "" || job.jobType === jobType) &&
      (salary === "" || job.salary.includes(salary)) &&
      (experience === "" || job.experience.includes(experience))
  );

  const sponsoredJobs = filteredJobs.slice(0, 3);

  const handleApply = (jobTitle) => {
    message.success(`Applied for ${jobTitle}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-6 py-10 flex gap-6">
      {/* Left Filter Column */}
      <div className="w-full md:w-1/4 h-[80vh] overflow-y-auto">
        <div className="mt-18 bg-white/90 p-6 rounded-lg shadow-lg mb-6 transition duration-300 hover:shadow-xl">
          <Title level={4} className="text-lg font-semibold mb-4 text-gray-900">Filter Jobs</Title>
          <Button type="link" className="text-indigo-600 mb-4">Clear All</Button>

          {/* Qualification Checkboxes */}
          <div className="space-y-1 mb-4">
            <Checkbox.Group value={qualification} onChange={setQualification} className="flex flex-col space-y-1">
              {["Below 10th","10th","12th","Diploma/ITI","Graduate","Post Graduate"].map((q) => (
                <Checkbox
                  key={q}
                  value={q}
                  className="text-gray-700 transition duration-200 hover:text-indigo-600 cursor-pointer"
                >
                  {q}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>

          {/* Job Category */}
          <div className="mb-4 transition duration-300 hover:shadow-sm p-2 rounded-md">
            <Text strong className="block mb-2 text-gray-900">Job Category</Text>
            <Select
              placeholder="Select job type"
              value={jobType}
              onChange={setJobType}
              className="w-full transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="Full Time">Full Time</Select.Option>
              <Select.Option value="Part Time">Part Time</Select.Option>
            </Select>
          </div>

          {/* Salary */}
          <div className="mb-4 transition duration-300 hover:shadow-sm p-2 rounded-md">
            <Text strong className="block mb-2 text-gray-900">Salary</Text>
            <Select
              placeholder="Select salary range"
              value={salary}
              onChange={setSalary}
              className="w-full transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="10000-20000">₹10,000 - ₹20,000</Select.Option>
              <Select.Option value="20000-30000">₹20,000 - ₹30,000</Select.Option>
            </Select>
          </div>

          {/* Experience */}
          <div className="transition duration-300 hover:shadow-sm p-2 rounded-md">
            <Text strong className="block mb-2 text-gray-900">Experience</Text>
            <Select
              placeholder="Select experience"
              value={experience}
              onChange={setExperience}
              className="w-full transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="0-1">0-1 Year</Select.Option>
              <Select.Option value="1-3">1-3 Years</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Right Job Listings Column */}
      <div className="w-full md:w-3/4 h-[80vh] overflow-y-auto flex flex-col gap-6 transition-all duration-500 ease-in-out">
        {/* Sponsored Jobs */}
        <div className="mt-18 bg-indigo-50 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
          <Title level={4} className="text-lg font-semibold mb-4 text-gray-900">Sponsored Jobs</Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sponsoredJobs.map((job, index) => (
              <Card
                key={index}
                hoverable
                className="bg-white p-4 rounded-lg shadow-md text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img src={job.logo} alt={job.title} className="w-16 h-16 mx-auto mb-2 object-contain" />
                <Title level={5} className="text-gray-900 font-semibold mb-1 transition duration-300 hover:text-indigo-600">{job.title}</Title>
                <Text className="text-gray-700 block mb-1">{job.company}</Text>
                <Text className="text-gray-700 block mb-1">{job.salary}</Text>
                <Text className="text-gray-700 block mb-2">{job.location}</Text>
                <Button
                  onClick={() => handleApply(job.title)}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold transition duration-300 transform hover:scale-105"
                >
                  Apply
                </Button>
                <Button icon={<SearchOutlined />} className="text-indigo-600 transition duration-300 hover:text-indigo-700 ml-2">Chat</Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 transition-all duration-500 ease-in-out">
          <Title level={4} className="text-lg font-semibold mb-4 text-gray-900">Job Listing</Title>
          {loading ? (
            <div className="text-center py-10">
              <Spin size="large" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <Text className="text-center text-gray-600 text-lg">No jobs found.</Text>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-500 ease-in-out">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  hoverable
                  className="bg-white p-4 rounded-lg shadow-md text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <img src={job.logo} alt={job.title} className="w-16 h-16 mx-auto mb-2 object-contain" />
                  <Title level={5} className="text-gray-900 font-semibold mb-1 transition duration-300 hover:text-indigo-600">{job.title}</Title>
                  <Text className="text-gray-700 block mb-1">{job.company}</Text>
                  <Text className="text-gray-700 block mb-1">{job.salary}</Text>
                  <Text className="text-gray-700 block mb-2">{job.location}</Text>
                  <Button
                    onClick={() => handleApply(job.title)}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold transition duration-300 transform hover:scale-105"
                  >
                    Apply
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Login & Register Modals */}
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
