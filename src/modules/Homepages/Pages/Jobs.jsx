// src/pages/Jobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Tag, Input, Row, Col, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("/Jobs.json")
      .then((res) => {
        setJobs(res.data.jobs || []);
        setFilteredJobs(res.data.jobs || []);
        setCategories(res.data.categories || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // Search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    filterJobs(value, selectedExperience, selectedCategory);
  };

  // Experience filter
  const handleExperienceChange = (value) => {
    setSelectedExperience(value);
    filterJobs(search, value, selectedCategory);
  };

  // Category click
  const handleCategoryClick = (category) => {
    const newCategory = selectedCategory === category ? "" : category; // toggle
    setSelectedCategory(newCategory);
    filterJobs(search, selectedExperience, newCategory);
  };

  // Combined filter function
  const filterJobs = (searchVal, expVal, catVal) => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        job.company.toLowerCase().includes(searchVal.toLowerCase()) ||
        job.location.toLowerCase().includes(searchVal.toLowerCase());
      const matchesExp = expVal ? job.experience.includes(expVal) : true;
      const matchesCat = catVal ? job.category === catVal : true;
      return matchesSearch && matchesExp && matchesCat;
    });
    setFilteredJobs(filtered);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#f0f6ff] py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Find your dream job now
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            5 lakh+ jobs for you to explore
          </p>

          {/* Search Form */}
          <Row gutter={[16, 16]} justify="center" className="mb-10">
            <Col xs={24} md={8}>
              <Input
                placeholder="Enter skills / designations / companies"
                value={search}
                onChange={handleSearch}
                size="large"
              />
            </Col>
            <Col xs={24} md={4}>
              <Select
                placeholder="Select experience"
                style={{ width: "100%" }}
                allowClear
                size="large"
                value={selectedExperience}
                onChange={handleExperienceChange}
              >
                <Option value="0-1 yrs">0-1 yrs</Option>
                <Option value="1-3 yrs">1-3 yrs</Option>
                <Option value="3-5 yrs">3-5 yrs</Option>
                <Option value="5+ yrs">5+ yrs</Option>
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Input placeholder="Enter location" size="large" />
            </Col>
            <Col xs={24} md={4}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                block
                size="large"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Search
              </Button>
            </Col>
          </Row>

          {/* Quick Categories */}
          <Row gutter={[16, 16]} justify="center">
            {categories.map((cat) => (
              <Col key={cat.id} xs={12} sm={8} md={4}>
                <Card
                  hoverable
                  onClick={() => handleCategoryClick(cat.category)}
                  className={`flex flex-col items-center justify-center text-center cursor-pointer ${
                    selectedCategory === cat.category ? "border-blue-500 border-2" : ""
                  }`}
                  style={{ padding: "16px" }}
                >
                  <img
                    src={cat.logo}
                    alt={cat.title}
                    className="w-12 h-12 mb-2 mx-auto"
                  />
                  <p className="font-medium text-gray-700">{cat.title}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Latest Jobs */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory ? `${selectedCategory} Jobs` : "Latest Jobs"}
        </h2>
        <Row gutter={[16, 16]}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Col key={job.id} xs={24} sm={12} lg={8}>
                <Card hoverable style={{ padding: "16px" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-full border"
                    />
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-gray-500 text-sm">{job.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{job.location}</p>
                  <p className="text-gray-500 text-sm">
                    {job.experience} • {job.salary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <Tag key={index} color="blue">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <Button
                    type="primary"
                    block
                    className="mt-4 bg-green-600 hover:bg-green-700"
                  >
                    Apply Now
                  </Button>
                </Card>
              </Col>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </Row>
      </div>
    </div>
  );
}
