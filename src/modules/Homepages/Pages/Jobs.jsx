import React, { useState, useEffect } from "react";
import { Card, Input, Button, Row, Col, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import LoginModal from "../../Auth/LoginModal";
import RegisterModal from "../../Auth/RegisterModal";

export default function Jobs() {
  // State Variables
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Jobs and Categories
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

  // Filter Jobs Based on Search
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true) &&
      (experience ? job.experience.toLowerCase().includes(experience.toLowerCase()) : true)
  );

  // Render
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Find your <span className="text-yellow-500">dream job</span> now
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600">
          {jobs.length > 0 ? `${jobs.length} lakh+ jobs for you to explore` : "Loading jobs..."}
        </p>

        {/* Search Form */}
        <Row gutter={[16, 16]} justify="center" className="mb-10">
          <Col xs={24} md={8}>
            <Input
              placeholder="Enter skills / designations / companies"
              size="large"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg"
            />
          </Col>
          <Col xs={24} md={4}>
            <Input
              placeholder="Select experience"
              size="large"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="rounded-lg"
            />
          </Col>
          <Col xs={24} md={4}>
            <Input
              placeholder="Enter location"
              size="large"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-lg"
            />
          </Col>
          <Col xs={24} md={4}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="large"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Search
            </Button>
          </Col>
        </Row>

        {/* Categories */}
        <Row gutter={[16, 16]} justify="center" className="mb-12">
          {categories.map((cat, idx) => (
            <Col xs={12} sm={8} md={4} key={idx}>
              <Card
                hoverable
                className="bg-white text-gray-900 text-center p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform"
              >
                <p className="font-medium">{cat}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Job Listings */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Latest Job Opportunities</h2>
        {loading ? (
          <div className="text-center py-20">
            <Spin size="large" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No jobs found.</p>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                hoverable
                className="bg-gray-50 text-gray-900 p-4 rounded-lg shadow-md"
              >
                <img
                  src={job.logo}
                  alt={job.title}
                  className="mb-2 w-full h-28 object-cover rounded-md"
                />
                <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-600">{job.location}</p>
                <p className="text-sm text-gray-600">{job.salary}</p>
                <p className="text-sm text-gray-600">{job.experience}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Login & Register Modals */}
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}