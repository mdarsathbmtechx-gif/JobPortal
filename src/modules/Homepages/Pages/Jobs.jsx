import React, { useState, useEffect } from "react";
import {
  Card,
  Checkbox,
  Select,
  Typography,
  Button,
  Collapse,
  Input,
  Tag,
  Skeleton,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import LoginModal from "../../Auth/LoginModal";
import RegisterModal from "../../Auth/RegisterModal";

const { Title, Text } = Typography;
const { Panel } = Collapse;

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

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(6);
  const increment = 6;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsRes = await axios.get("/Jobs.json");
        const categoriesRes = await axios.get("/Categories.json");
        setJobs(Array.isArray(jobsRes.data.jobs) ? jobsRes.data.jobs : []);
        setCategories(
          Array.isArray(categoriesRes.data.topics)
            ? categoriesRes.data.topics
            : []
        );
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
      (qualification.length === 0 ||
        qualification.includes(job.qualification)) &&
      (jobType === "" || job.jobType === jobType) &&
      (salary === "" || job.salary.includes(salary)) &&
      (experience === "" || job.experience.includes(experience))
  );

  const sponsoredJobs = filteredJobs.slice(0, 3);

  return (
    <div className="mt-12 min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-10 flex flex-col lg:flex-row gap-6">
      {/* Left Filters Column */}
      <div className="w-full lg:w-1/4 lg:sticky lg:top-6 h-fit">
        {/* Collapse for mobile */}
        <Collapse className="lg:hidden mb-4 rounded-lg bg-white shadow">
          <Panel header="Filter Jobs" key="1">
            <Filters
              qualification={qualification}
              setQualification={setQualification}
              jobType={jobType}
              setJobType={setJobType}
              salary={salary}
              setSalary={setSalary}
              experience={experience}
              setExperience={setExperience}
            />
          </Panel>
        </Collapse>

        {/* Always visible on lg+ */}
        <div className="hidden lg:block bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <Filters
            qualification={qualification}
            setQualification={setQualification}
            jobType={jobType}
            setJobType={setJobType}
            salary={salary}
            setSalary={setSalary}
            experience={experience}
            setExperience={setExperience}
          />
        </div>
      </div>

      {/* Right Job Listings Column */}
      <div className="w-full lg:w-3/4 flex flex-col gap-6">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search jobs by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </div>

        {/* Sponsored Jobs */}
        {sponsoredJobs.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-2xl shadow-md border border-indigo-100">
            <Title level={4} className="font-semibold mb-4 text-gray-900">
              Sponsored Jobs
            </Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {sponsoredJobs.map((job, index) => (
                <JobCard key={index} job={job} sponsored />
              ))}
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex-1">
          <Title level={4} className="font-semibold mb-4 text-gray-900">
            Job Listings
          </Title>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="rounded-lg shadow-sm">
                  <Skeleton active avatar paragraph={{ rows: 2 }} />
                </Card>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-10">
              <img
                src="/no-jobs.svg"
                alt="No jobs"
                className="mx-auto mb-4 w-40 opacity-80"
              />
              <Text className="block text-gray-600 text-lg mb-4">
                No jobs match your filters.
              </Text>
              <Button type="primary" onClick={() => window.location.reload()}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredJobs.slice(0, visibleCount).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredJobs.length && (
                <div className="flex justify-center mt-6">
                  <Button
                    type="primary"
                    onClick={() => setVisibleCount((prev) => prev + increment)}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}

// Job Card Component
const JobCard = ({ job, sponsored }) => (
  <Card
    hoverable
    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 text-center relative"
    data-aos="fade-up"
    data-aos-delay={job.id * 50}
  >
    {sponsored && (
      <Tag color="gold" className="absolute top-2 right-2">
        Sponsored
      </Tag>
    )}
    <img
      src={job.logo}
      alt={job.title}
      className="w-16 h-16 mx-auto mb-2 object-contain rounded-md"
      loading="lazy"
    />
    <Title level={5} className="text-gray-900 font-semibold mb-1">
      {job.title}
    </Title>
    <Text className="text-gray-700 block mb-1">{job.company}</Text>
    <Text className="text-gray-700 block mb-1">{job.salary}</Text>
    <Text className="text-gray-500 text-sm block mb-2">
      {job.location} • {job.experience}
    </Text>
    <div className="flex justify-center gap-2 mt-2">
      <Button size="small" className="text-green-600 border border-green-600">
        Chat
      </Button>
      <Button size="small" className="text-blue-600 border border-blue-600">
        Call HR
      </Button>
    </div>
  </Card>
);

// Filters Component
const Filters = ({
  qualification,
  setQualification,
  jobType,
  setJobType,
  salary,
  setSalary,
  experience,
  setExperience,
}) => (
  <div className="space-y-6">
    <div>
      <Title level={5} className="text-gray-900 mb-2">
        Qualification
      </Title>
      <Checkbox.Group
        value={qualification}
        onChange={setQualification}
        className="flex flex-col space-y-1"
      >
        {["Below 10th", "10th", "12th", "Diploma/ITI", "Graduate", "Post Graduate"].map(
          (q) => (
            <Checkbox key={q} value={q} className="text-gray-700 cursor-pointer">
              {q}
            </Checkbox>
          )
        )}
      </Checkbox.Group>
    </div>

    <div>
      <Text strong className="block mb-2 text-gray-900">
        Job Type
      </Text>
      <Select
        placeholder="Select job type"
        value={jobType}
        onChange={setJobType}
        className="w-full"
      >
        <Select.Option value="">All</Select.Option>
        <Select.Option value="Full Time">Full Time</Select.Option>
        <Select.Option value="Part Time">Part Time</Select.Option>
        <Select.Option value="Freelancer">Freelancer</Select.Option>
      </Select>
    </div>

    <div>
      <Text strong className="block mb-2 text-gray-900">
        Salary
      </Text>
      <Select
        placeholder="Select salary range"
        value={salary}
        onChange={setSalary}
        className="w-full"
      >
        <Select.Option value="">All</Select.Option>
        <Select.Option value="10000-20000">₹10,000 - ₹20,000</Select.Option>
        <Select.Option value="20000-30000">₹20,000 - ₹30,000</Select.Option>
        <Select.Option value="30000-50000">₹30,000 - ₹50,000</Select.Option>
      </Select>
    </div>

    <div>
      <Text strong className="block mb-2 text-gray-900">
        Experience
      </Text>
      <Select
        placeholder="Select experience"
        value={experience}
        onChange={setExperience}
        className="w-full"
      >
        <Select.Option value="">All</Select.Option>
        <Select.Option value="0-1">0-1 Year</Select.Option>
        <Select.Option value="1-3">1-3 Years</Select.Option>
        <Select.Option value="3-5">3-5 Years</Select.Option>
      </Select>
    </div>
  </div>
);
