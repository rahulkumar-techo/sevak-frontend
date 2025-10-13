"use client"
import JobForm from '@/app/dashboard/components/JobForm'
import { JobFormValues } from '@/app/dashboard/schemas/job.schema'
import { useCreateJobMutation } from '@/redux/features/job/jobApi'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

type Props = {}

const CreateJobPage = (props: Props) => {
  const [createJob, { isLoading, isSuccess, error }] = useCreateJobMutation();

  useEffect(() => {
    if (error) {
      const msg = (error as any).data?.message || "Failed to create job";
      toast.error(msg);
    };
    if (isSuccess) {
      toast.success("Job created")
    }
  }, [error, isSuccess])
  const handleSumit = (values: Partial<JobFormValues>) => {
// Ensure location object is always present
    const location = values.location || {
      type: "Point",
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      landmark: "",
    };

    // Send values with proper location
    createJob({
      ...values,
      location, // this will be stringified in RTK Query before sending FormData
    });
  }
  return (
    <div>
      <JobForm onSubmitForm={handleSumit} isLoading={isLoading} />
    </div>
  )
}

export default CreateJobPage