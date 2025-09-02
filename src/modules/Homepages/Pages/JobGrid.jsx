// src/components/JobGrid.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const badgeColors = {
  Featured: "bg-green-100 text-green-700 border border-green-300",
  Urgent: "bg-orange-100 text-orange-700 border border-orange-300",
  Freelancer: "bg-blue-100 text-blue-700 border border-blue-300",
  "Part Time": "bg-purple-100 text-purple-700 border border-purple-300",
  Internship: "bg-red-100 text-red-700 border border-red-300",
};

export default function JobGrid() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/data.json")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">Featured Jobs</h2>
      <p className="text-center text-gray-600 mb-10">
        Discover your next opportunity with top companies around the world.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Full image top */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={job.logo}
                alt={job.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {job.badges.map((badge, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1 rounded-full font-medium ${badgeColors[badge] || "bg-gray-100 text-gray-700"}`}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{job.skills}</p>

              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">{job.salary}</span>
                <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                  {job.openings} Open
                </span>
              </div>

              <button className="mt-auto bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
