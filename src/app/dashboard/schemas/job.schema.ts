import { z } from "zod";

// --- MEDIA SCHEMA ---
export const mediaSchema = z.object({
  jobImages: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
        url: z.string().url("Invalid image URL").optional(),
        fileId: z.string().min(1, "File ID is required"),
      })
    )
    .max(5, "You can upload up to 5 images only")
    .optional(),

  jobVideo: z
    .object({
      file: z.instanceof(File).optional(),
      url: z.string().optional(),
      fileId: z.string().min(1, "File ID is required"),
    })
    .optional(),

  deletedFileIds: z.array(z.string()).optional(),
});

// --- LOCATION SCHEMA ---
export const locationSchema = z.object({
  type: z.literal("Point"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  landmark: z.string().min(1, "Landmark is required"),
});

// --- JOB FORM SCHEMA ---
export const jobFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  budget: z.number().min(0, "Budget must be at least 0"),
  jobType: z.enum(["Part-Time", "Full-Time"]),
  location: locationSchema,
  media: mediaSchema.optional(),
  distanceLimit: z.number().min(0, "Distance limit must be at least 0"),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
