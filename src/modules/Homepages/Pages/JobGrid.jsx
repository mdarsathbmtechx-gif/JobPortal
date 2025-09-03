// src/components/JobGrid.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Tag, Button } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";

const { Meta } = Card;

const badgeColors = {
  Featured: "green",
  Urgent: "orange",
  Freelancer: "blue",
  "Part Time": "purple",
  Internship: "red",
};

// Function to pick animation based on column index
const getAnimation = (idx) => {
  const animations = ["fade-right", "fade-up", "fade-left"];
  return animations[idx % animations.length];
};

export default function JobGrid() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("/data.json")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));

    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <h2
        className="text-3xl font-bold text-center mb-2"
        data-aos="fade-down"
      >
        Featured Jobs
      </h2>
      <p
        className="text-center text-gray-600 mb-10"
        data-aos="fade-up"
      >
        Discover your next opportunity with top companies around the world.
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {jobs.map((job, idx) => (
          <Card
            key={idx}
            hoverable
            cover={
              <img
                alt={job.title}
                src={job.logo}
                className="h-48 w-full object-cover" // fixed image height
              />
            }
            className="rounded-2xl shadow-md"
            data-aos={getAnimation(idx)} // Different animations
            data-aos-delay={idx * 100}   // Stagger effect
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {job.badges.map((badge, i) => (
                <Tag key={i} color={badgeColors[badge] || "default"}>
                  {badge}
                </Tag>
              ))}
            </div>

            {/* Job Info */}
            <Meta
              title={<span className="font-semibold">{job.title}</span>}
              description={<span className="text-gray-500">{job.skills}</span>}
            />

            {/* Salary + Openings */}
            <div className="flex justify-between items-center mt-4 mb-3">
              <span className="font-bold text-gray-800">{job.salary}</span>
              <Tag color="green">{job.openings} Open</Tag>
            </div>

            {/* Apply Button */}
            <Button type="primary" block className="!rounded-full">
              Apply Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
