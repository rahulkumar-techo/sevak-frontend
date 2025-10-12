"use client";

import React from "react";
import JobCard from "@/components/job/JobCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IJob } from "@/components/job/types";

 type props ={
  jobData:any
}

const ListsOfJobs = (
{jobData}:props
) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* LEFT: USER PANEL */}
      <aside className="w-full md:w-1/4 lg:w-1/5 hidden bg-white dark:bg-gray-900 shadow-md p-6 lg:flex flex-col items-center md:items-start gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Rahul Kumar
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Job Seeker / Provider
          </p>
        </div>
        <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <p>📍 Patna, Bihar</p>
          <p>📞 +91 9876543210</p>
          <p>📧 rahul@example.com</p>
        </div>
      </aside>

      {/* MAIN: JOB LIST */}
      <main className="flex-1 flex justify-center p-4 md:p-8">
        <ScrollArea className="w-full max-w-4xl space-y-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Jobs You May Be Interested In
          </h1>
          <div className="flex flex-col gap-4">
            {jobData&&jobData.map((job:any, index:any) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default ListsOfJobs;
