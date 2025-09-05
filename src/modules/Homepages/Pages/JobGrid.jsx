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

const animations = ["fade-right", "fade-up", "fade-left", "zoom-in", "flip-left"];
const getAnimation = (idx) => animations[idx % animations.length];

export default function JobGrid() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data.json")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const getBadgeColor = (badge) =>
    badgeColors[badge] || `#${([...badge].reduce((acc, char) => acc + char.charCodeAt(0), 0) % 16777215).toString(16)}`;

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-x-hidden box-border">
      <h2 className="text-3xl font-bold text-center mb-2" data-aos="fade-down">
        Featured Jobs
      </h2>
      <p className="text-center text-gray-600 mb-10" data-aos="fade-up">
        Discover your next opportunity with top companies around the world.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobs.map((job, idx) => (
            <Card
              key={idx}
              hoverable
              cover={
                <img
                  alt={job.title || "Job Logo"}
                  src={job.logo || "/placeholder.png"}
                  className="h-48 w-full object-cover rounded-t-2xl"
                  style={{ maxWidth: "100%", display: "block" }}
                />
              }
              className="rounded-2xl shadow-md flex flex-col justify-between"
              data-aos={getAnimation(idx)}
              data-aos-delay={idx * 100}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {job.badges?.map((badge, i) => (
                  <Tag key={i} color={getBadgeColor(badge)}>
                    {badge}
                  </Tag>
                ))}
              </div>

              <Meta
                title={<span className="font-semibold">{job.title || "Untitled Job"}</span>}
                description={<span className="text-gray-500">{job.skills || "N/A"}</span>}
              />

              <div className="flex justify-between items-center mt-4 mb-3">
                <span className="font-bold text-gray-800">{job.salary || "N/A"}</span>
                <Tag color="green">{job.openings ?? 0} Open</Tag>
              </div>

              <Button type="primary" block className="!rounded-full mt-auto">
                Apply Now
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
