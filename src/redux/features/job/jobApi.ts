import { apiSlice } from "../apis/apiSlice";
import { updateJob } from "./jobSlice";
import { JobFormValues } from "@/app/dashboard/schemas/job.schema";

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<any, Partial<JobFormValues>>({
      query: (data) => {
        const formData = new FormData();

        // --- Simple text fields ---
        const textFields: (keyof JobFormValues)[] = [
          "title",
          "category",
          "description",
          "jobType"
        ];

        textFields.forEach((key) => {
          const value = data[key];
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });


        formData.append("budget", String(data.budget ?? 0));
        formData.append("distanceLimit", String(data.distanceLimit ?? 20));

        // --- Flattened location fields ---
if (data.location) {
  // TypeScript type narrowing
  const loc: NonNullable<JobFormValues["location"]> = data.location as any;

  formData.append(
    "location",
    JSON.stringify({
      type: loc.type ?? "Point",
      address: loc.address ?? "",
      city: loc.city ?? "",
      state: loc.state ?? "",
      country: loc.country ?? "",
      postalCode: loc.postalCode ?? "",
      landmark: loc.landmark ?? "",
    })
  );
} else {
  // Default empty location
  formData.append(
    "location",
    JSON.stringify({
      type: "Point",
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      landmark: "",
    })
  );
}

        // --- Images ---
        if (Array.isArray(data.media?.jobImages)) {
          data.media.jobImages.forEach((img, index) => {
            if (img.file) {
              formData.append("jobImages", img.file);
              console.log(`Appending Job Image ${index}:`, img.file.name);
            }
          });
        }

        // --- Video ---
        if (data.media?.jobVideo?.file) {
          formData.append("jobVideo", data.media.jobVideo.file);
          console.log("Appending Job Video:", data.media.jobVideo.file.name);
        }

        // --- Debug FormData ---
        console.log("FormData contents:");
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }

        return {
          url: "/job/create",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },

      invalidatesTags: ["job"],

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) dispatch(updateJob(data.data));
        } catch (error) {
          console.error("Job create failed:", error);
        }
      },
    }),

    getJobs: builder.query<any, void>({
      query: () => ({ url: "/job", method: "GET", credentials: "include" }),
      providesTags: ["job"],
    }),

    getSingle: builder.query<any, { id: string }>({
      query: ({ id }) => ({ url: `/job/${id}`, method: "GET", credentials: "include" }),
      providesTags: ["job"],
    }),
  }),
});

export const { useCreateJobMutation, useGetJobsQuery, useGetSingleQuery } = jobApi;
