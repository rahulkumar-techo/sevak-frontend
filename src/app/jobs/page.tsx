"use client";

import Header from "@/components/Header";
import React from "react";
import ListsOfJobs from "./ListsOfJobs";
import { useGetJobsQuery } from "@/redux/features/job/jobApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateJob } from "@/redux/features/job/jobSlice";

type Props = {};

const JobsPage: React.FC<Props> = () => {
  // Fetch jobs from RTK Query
 const dispatch = useDispatch();
  const { data: getJobs, isLoading } = useGetJobsQuery();

  React.useEffect(() => {
    if (getJobs?.data) {
      dispatch(updateJob(getJobs.data?.jobs));
    }
  }, [getJobs, dispatch]);

  // Get job state from Redux (if needed)
  const { jobs } = useSelector((state: RootState) => state.job);

  console.log("Redux Job State:",jobs);

  return (
    <div>
      <Header activeItem={1} />
      <div className="mt-[60px]">
        {/* You can pass job data if ListsOfJobs accepts it */}
        <ListsOfJobs jobData={getJobs?.data?.jobs||jobs} />
      </div>
    </div>
  );
};

export default JobsPage;
