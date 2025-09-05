// src/components/CompanyGrid.jsx
import React, { useEffect, useState } from "react";
import { Card, Tag, Button } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";

const { Meta } = Card;

// Optional tag colors for industries or features
const badgeColors = {
  Tech: "green",
  Design: "purple",
  AI: "orange",
  Remote: "blue",
};

// Function to pick animation based on index
const getAnimation = (idx) => {
  const animations = ["fade-right", "fade-up", "fade-left"];
  return animations[idx % animations.length];
};

export default function CompanyGrid() {
  const [companies, setCompanies] = useState([]);
  const [followed, setFollowed] = useState({}); // Track follow state

  useEffect(() => {
    // Fetch the JSON file from public folder
    fetch("/CompaniesGrid.json")
      .then((res) => res.json())
      .then((data) => setCompanies(data || []))
      .catch((err) => console.error("Error fetching companies:", err));

    AOS.init({ duration: 800, once: true });
  }, []);

  // Refresh animations whenever companies update
  useEffect(() => {
    AOS.refresh();
  }, [companies]);

  const handleFollow = (companyName) => {
    setFollowed({ ...followed, [companyName]: !followed[companyName] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-2" data-aos="fade-down">
        Featured Companies
      </h2>
      <p className="text-center text-gray-600 mb-10" data-aos="fade-up">
        Explore top companies and discover your next opportunity.
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {companies.map((company, idx) => (
          <Card
            key={company.name + idx}
            hoverable
            cover={
              <img
                alt={company.name}
                src={company.logo || "/placeholder.png"}
                loading="lazy"
                className="h-48 w-full object-cover rounded-t-2xl"
              />
            }
            className="rounded-2xl shadow-md"
            data-aos={getAnimation(idx)}
            data-aos-delay={idx * 100}
          >
            {/* Tags / badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {company.tags?.map((tag, i) => (
                <Tag key={i} color={badgeColors[tag] || "default"}>
                  {tag}
                </Tag>
              ))}
            </div>

            {/* Company Info */}
            <Meta
              title={<span className="font-semibold">{company.name}</span>}
              description={
                <span className="text-gray-500">
                  {company.industry || "Industry Unknown"} - {company.location || "Location Unknown"}
                </span>
              }
            />

            {/* Company Size */}
            <div className="flex justify-between items-center mt-4 mb-3">
              {company.size && <Tag color="blue">{company.size}</Tag>}
            </div>

            {/* Follow / View Button */}
            <Button
              type={followed[company.name] ? "default" : "primary"}
              block
              className="!rounded-full"
              onClick={() => handleFollow(company.name)}
              aria-label={`${followed[company.name] ? "Unfollow" : "Follow"} ${company.name}`}
            >
              {followed[company.name] ? "Following" : "Follow"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
