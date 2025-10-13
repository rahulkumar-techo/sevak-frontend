"use client";

import React from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import JobDetailsCompact from "@/components/job/JobDetails";
import { useGetSingleQuery } from "@/redux/features/job/jobApi";

const Page = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const {
    data: jobData,
    isLoading,
    isError,
  } = useGetSingleQuery({ id: jobId });

 console.log("Fetched jobData:", jobData); // 👀 Check structure once

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header activeItem={1} />

      <div className="flex-1 overflow-y-auto mt-[70px] p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <JobDetailsCompact job={jobData?.data} isLoading={isLoading} isError={isError} />
        </div>
      </div>
    </div>
  );
};

export default Page;
