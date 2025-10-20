import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJob } from "@/components/job/types";

interface JobState {
  jobs: IJob[];           // List of all jobs
  selectedJob?: IJob;
  selectUserCreatedJobs: Partial<IJob>[]     // Currently viewed/edited job
}

const initialState: JobState = {
  jobs: [],
  selectedJob: undefined,
  selectUserCreatedJobs: []

};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    // Set the full job list
    setJobs: (state, action: PayloadAction<IJob[]>) => {
      state.jobs = action.payload;
    },

    // Add a new job to the list
    addJob: (state, action: PayloadAction<IJob>) => {
      state.jobs.push(action.payload);
      state.selectedJob = action.payload;
    },

    // Update an existing job by ID
    updateJob: (state, action: PayloadAction<IJob>) => {
      const index = state.jobs.findIndex(j => j._id === action.payload._id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      } else {
        state.jobs.push(action.payload); // fallback: add if not found
      }
      state.selectedJob = action.payload;
    },

    // Set only the selected job
    setSelectedJob: (state, action: PayloadAction<IJob>) => {
      state.selectedJob = action.payload;
    },

    // Remove a job by ID
    removeJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(j => j._id !== action.payload);
      if (state.selectedJob?._id === action.payload) {
        state.selectedJob = undefined;
      }
    },
    // User selectedJobs 
    jobsCreatedByuser: (state, action) => {
      state.selectUserCreatedJobs = action.payload;
    }
  },
});

export const { setJobs, addJob, updateJob, setSelectedJob, removeJob,jobsCreatedByuser } = jobSlice.actions;
export default jobSlice.reducer;
