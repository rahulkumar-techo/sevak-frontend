"use client";

import React from "react";
import { IJob } from "./types"; // use the shared interface
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MapPin, Clock, IndianRupee, User } from "lucide-react";
import Link from "next/link";

interface IJobCardProps {
  job: IJob;
}

const JobCard: React.FC<IJobCardProps> = ({ job }) => {
  const shortDesc =
    job.description.length > 120
      ? job.description.slice(0, 120) + "..."
      : job.description;

  const statusColor = {
    open: "text-green-600 dark:text-green-400",
    "in-progress": "text-blue-500 dark:text-blue-400",
    completed: "text-gray-500 dark:text-gray-400",
    cancelled: "text-red-500 dark:text-red-400",
  }[job.status];

  return (
    <Card className="w-full rounded-xl shadow-md dark:bg-gray-900 hover:shadow-lg transition p-4 border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row gap-4">
      {/* LEFT: Icon / Company Placeholder */}
      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full text-xl font-bold text-gray-600 dark:text-gray-200">
        {job.title.charAt(0)}
      </div>

      {/* CENTER: Job Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {job.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {shortDesc}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mt-3">
          <div className="flex items-center gap-1">
            <IndianRupee size={14} />
            <span>₹{job.budget}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{job.location.address || "Location not specified"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{job.createdBy || "Unknown"}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Status & Action */}
      <div className="flex flex-col items-end justify-between">
        <span className={`text-xs font-semibold ${statusColor}`}>
          {job.status.toUpperCase()}
        </span>
        <button className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
          <Link href={`/jobs/${job?._id}`} prefetch>
            View Details
          </Link>
        </button>
      </div>
    </Card>
  );
};

export default JobCard;
