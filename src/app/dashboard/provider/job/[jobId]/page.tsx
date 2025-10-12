"use client";

import React, { useEffect, useState } from "react";
import JobForm from "../../../components/JobForm";
import { useRouter, useParams } from "next/navigation";
import { JobFormValues } from "../../../schemas/job.schema";



const UpdateJobPage = () => {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId;

  const [jobData, setJobData] = useState<Partial<JobFormValues> | null>(null);

//   useEffect(() => {
//     // Fetch job by ID
//     const fetchJob = async () => {
//       const res = await fetch(`/api/jobs/${jobId}`);
//       const data = await res.json();
//       setJobData(data);
//     };
//     fetchJob();
//   }, [jobId]);


  const handleSubmit = (data: JobFormValues) => {
    console.log("Update job data:", data);
    // Call API to update job
    // router.push("/dashboard/jobs");
  };

//   if (!jobData) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-1">
      <h1 className="text-2xl font-bold mb-4">Update Job</h1>
      {/* <JobForm initialValues={dummyJobData} onSubmit={handleSubmit} isUpdate /> */}
    </div>
  );
};

export default UpdateJobPage;
