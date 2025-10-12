"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User, Wallet, Flag, Layers } from "lucide-react";
import JobMedia from "./JobMedia";

interface ILocation { latitude: number; longitude: number; address?: string; }
interface IMedia { images?: string[]; videos?: string[]; }
interface IJob {
  title: string;
  jobType: string[];
  description: string;
  category: string;
  budget: number;
  location: ILocation;
  createdBy: string;
  assignedTo?: string;
  status: "open" | "in-progress" | "completed" | "cancelled";
  media?: IMedia;
  distanceLimit: number;
  createdAt: Date | string;
  updateAt: Date | string;
  contact?: string;
}

interface Props { job?: Partial<IJob>; isLoading?: boolean; isError?: boolean; }

const JobDetailsCompact = ({ job, isLoading, isError }: Props) => {
  console.log(job)
  if (isLoading) {
    return (
      <div className="w-full text-center py-20 text-gray-500 dark:text-gray-400">
        Loading job details...
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="w-full text-center py-20 text-red-600 dark:text-red-400">
        Failed to load job details.
      </div>
    );
  }

  return (
    <motion.div className="w-full flex flex-col lg:flex-row gap-4">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/3 bg-white dark:bg-gray-900 p-4 md:p-6 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm sticky top-4 h-fit space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Flag size={18} /> {job.title ?? "Untitled Job"}
        </h2>

        <div className="flex flex-wrap gap-2">
          {(job.jobType ?? []).map((type, idx) => (
            <Badge key={idx} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs sm:text-sm">
              {type}
            </Badge>
          ))}
        </div>

        {job.contact && (
          <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <User size={16} /> Contact: {job.contact}
          </div>
        )}

        <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
          {job.budget !== undefined && (
            <div className="flex items-center gap-2"><Wallet size={16} /> Budget: ₹{job.budget}</div>
          )}
          {job.location?.address && (
            <div className="flex items-center gap-2"><MapPin size={16} /> Location: {job.location.address}</div>
          )}
          {job.category && (
            <div className="flex items-center gap-2"><Layers size={16} /> Category: {job.category}</div>
          )}
          {job.distanceLimit !== undefined && (
            <div className="flex items-center gap-2"><MapPin size={16} /> Distance: {job.distanceLimit} km</div>
          )}
          {job.createdBy && (
            <div className="flex items-center gap-2"><User size={16} /> Posted By: {job.createdBy}</div>
          )}
          {job.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar size={16} /> Posted On: {new Date(job.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-2">Apply Now</Button>

        {job.status && (
          <Badge
            className={`px-3 py-1 text-sm mt-2 rounded ${
              job.status === "open"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : job.status === "in-progress"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                : job.status === "completed"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            }`}
          >
            {job.status.toUpperCase()}
          </Badge>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
          {job.description || "No description provided."}
        </p>
        {job.media && <JobMedia media={job.media} />}
      </div>
    </motion.div>
  );
};

export default JobDetailsCompact;
