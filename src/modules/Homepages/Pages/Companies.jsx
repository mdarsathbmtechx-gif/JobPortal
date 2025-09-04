// src/modules/Homepages/Pages/Companies.jsx
import React, { useState, useEffect } from "react";
import { Card, Checkbox, Select, Button, Typography, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import LoginModal from "../../Auth/LoginModal";
import RegisterModal from "../../Auth/RegisterModal";

const { Title, Text } = Typography;

export default function Companies() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesRes = await axios.get("/Companies.json");
        const industriesRes = await axios.get("/Industries.json");
        setCompanies(Array.isArray(companiesRes.data.companies) ? companiesRes.data.companies : []);
        setIndustries(Array.isArray(industriesRes.data.industries) ? industriesRes.data.industries : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCompanies([]);
        setIndustries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) &&
      (industryFilter.length === 0 || industryFilter.includes(company.industry)) &&
      (locationFilter === "" || company.location.includes(locationFilter)) &&
      (sizeFilter === "" || company.size.includes(sizeFilter))
  );

  const sponsoredCompanies = filteredCompanies.slice(0, 3);

  const handleFollow = (companyName) => {
    message.success(`Followed ${companyName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-6 py-10 flex gap-6">
      {/* Left Filter Column */}
      <div className="w-full md:w-1/4 h-[80vh] overflow-y-auto">
        <div className="mt-18 bg-white/90 p-6 rounded-lg shadow-lg mb-6 transition duration-300 hover:shadow-xl">
          <Title level={4} className="text-lg font-semibold mb-4 text-gray-900">Filter Companies</Title>
          <Button type="link" className="text-indigo-600 mb-4" onClick={() => {
            setIndustryFilter([]);
            setLocationFilter("");
            setSizeFilter("");
          }}>Clear All</Button>

          {/* Industry Checkboxes */}
          <div className="space-y-1 mb-4">
            <Checkbox.Group value={industryFilter} onChange={setIndustryFilter} className="flex flex-col space-y-1">
              {industries.map((ind) => (
                <Checkbox
                  key={ind}
                  value={ind}
                  className="text-gray-700 transition duration-200 hover:text-indigo-600 cursor-pointer"
                >
                  {ind}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>

          {/* Location */}
          <div className="mb-4 transition duration-300 hover:shadow-sm p-2 rounded-md">
            <Text strong className="block mb-2 text-gray-900">Location</Text>
            <Select
              placeholder="Select location"
              value={locationFilter}
              onChange={setLocationFilter}
              className="w-full transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="Chennai">Chennai</Select.Option>
              <Select.Option value="Bangalore">Bangalore</Select.Option>
            </Select>
          </div>

          {/* Company Size */}
          <div className="transition duration-300 hover:shadow-sm p-2 rounded-md">
            <Text strong className="block mb-2 text-gray-900">Company Size</Text>
            <Select
              placeholder="Select size"
              value={sizeFilter}
              onChange={setSizeFilter}
              className="w-full transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="1-50">1-50 Employees</Select.Option>
              <Select.Option value="51-200">51-200 Employees</Select.Option>
              <Select.Option value="201-500">201-500 Employees</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Right Companies Column */}
      <div className="w-full md:w-3/4 h-[80vh] overflow-y-auto flex flex-col gap-6 transition-all duration-500 ease-in-out">
        {/* Sponsored Companies */}
        <div className="mt-18 bg-indigo-50 p-6 rounded-lg shadow-md transition duration-500 ease-in-out">
          <Title level={4} className="text-lg font-semibold mb-4 text-gray-900">Sponsored Companies</Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sponsoredCompanies.map((company, index) => (
              <Card
                key={index}
                hoverable
                className="bg-white p-4 rounded-lg shadow-md text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img src={company.logo} alt={company.name} className="w-16 h-16 mx-auto mb-2 object-contain" />
                <Title level={5} className="text-gray-900 font-semibold mb-1 transition duration-300 hover:text-indigo-600">{company.name}</Title>
                <Text className="text-gray-700 block mb-1">{company.industry}</Text>
                <Text className="text-gray-700 block mb-1">{company.location}</Text>
                <Text className="text-gray-700 block mb-2">{company.size}</Text>
                <Button
                  onClick={() => handleFollow(company.name)}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold transition duration-300 transform hover:scale-105"
                >
                  Follow
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Listings */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1 transition-all duration-500 ease-in-out">
          <Title level={4} className="text-lg font-semibold mb-4 text-gray-900">Company Listing</Title>
          {loading ? (
            <div className="text-center py-10">
              <Spin size="large" />
            </div>
          ) : filteredCompanies.length === 0 ? (
            <Text className="text-center text-gray-600 text-lg">No companies found.</Text>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-500 ease-in-out">
              {filteredCompanies.map((company) => (
                <Card
                  key={company.id}
                  hoverable
                  className="bg-white p-4 rounded-lg shadow-md text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <img src={company.logo} alt={company.name} className="w-16 h-16 mx-auto mb-2 object-contain" />
                  <Title level={5} className="text-gray-900 font-semibold mb-1 transition duration-300 hover:text-indigo-600">{company.name}</Title>
                  <Text className="text-gray-700 block mb-1">{company.industry}</Text>
                  <Text className="text-gray-700 block mb-1">{company.location}</Text>
                  <Text className="text-gray-700 block mb-2">{company.size}</Text>
                  <Button
                    onClick={() => handleFollow(company.name)}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold transition duration-300 transform hover:scale-105"
                  >
                    Follow
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
